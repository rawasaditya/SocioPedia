import jwt from "jsonwebtoken";
import dotenv from "dotenv";
process.env.JWT_SECRET="4PJqnalPar"
dotenv.config();
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Access Denied" });
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verified)
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};
