import User from "../models/User.js";
import Post from "../models/Post.js";
import Notif from "../models/Notif.js";

export const createPosts = async (req, res) => {
  try {
    const { userId, description, picturePath, pictureName, gifPath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      description,
      picturePath,
      pictureName,
      gifPath,
    });
    await newPost.save();
    const update = await newPost.populate(
      "userId",
      "_id firstName lastName email location picturePath"
    );
    res.status(201).json(update);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getFeedsPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("userId", "_id firstName lastName email location picturePath");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId }).populate(
      "userId",
      "_id firstName lastName email location picturePath"
    );
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const likePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const post = await Post.findById(id);
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((i) => i != userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    const latestPost = await post.populate(
      "userId",
      "_id firstName lastName email location picturePath"
    );
    res.json(latestPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
