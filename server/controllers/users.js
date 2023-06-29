import User from "../models/User.js";
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const userFriends = await User.findById(id).populate(
      "friends",
      "_id firstName lastName email location picturePath"
    );
    res.status(200).json(userFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendsId } = req.params;
    if (id === friendsId) throw "Cannot add self as friend";
    const user = await User.findById(id).select("-password");
    const friend = await User.findById(friendsId).select("-password");
    if (user.friends.includes(friendsId)) {
      user.friends = user.friends.filter((i) => i !== friendsId);
      friend.friends = friend.friends.filter((i) => i !== id);
    } else {
      user.friends.push(friendsId);
      friend.friends.push(id);
    }
    await user.save();
    const updatedUser = await user.populate(
      "friends",
      "_id firstName lastName email picturePath location occupation"
    );
    await friend.save();

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const searchFriends = async (req, res) => {
  try {
    const { searchText } = req.body;
    const user = await User.find({
      $expr: {
        $regexMatch: {
          input: { $concat: ["$firstName", " ", "$lastName"] },
          regex: searchText,
          options: "i",
        },
      },
    }).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
