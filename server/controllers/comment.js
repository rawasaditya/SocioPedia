import Comment from "../models/Comments.js";
import Post from "../models/Post.js";
import mongoose from "mongoose";
const toId = mongoose.Types.ObjectId;

export const createComment = async (req, res) => {
  try {
    const { description, postId } = req.body;
    const newComment = new Comment({
      description,
      userId: req.user.id,
    });
    await newComment.save();
    const post = await Post.findById(postId);
    post.comments.push(newComment._id);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getComments = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
