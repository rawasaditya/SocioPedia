import User from "../models/User.js";
import Post from "../models/Post.js";
export const createPosts = async (req, res) => {
  try {
    const { userId, description, picturePath, pictureName } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      description,
      picturePath,
      pictureName,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getFeedsPosts = async (req, res) => {
  try {
    const posts = await Post.find();
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
      "firstName lastName picturePath"
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
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
