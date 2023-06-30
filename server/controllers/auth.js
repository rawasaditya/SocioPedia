import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const validateEmail = (email) =>
  email.match(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      throw { message: "Invalid Email address" };
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
    });
    const saveUser = await newUser.save();
    delete saveUser._doc.password;
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) {
      throw { message: "Invalid Email address" };
    }
    const user = await User.findOne({ email });
    if (!user) throw { message: "User not found" };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { message: "User password not matched" };
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const respDetails = { ...user._doc };
    delete respDetails.password;
    res.status(200).json({ user: respDetails, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
