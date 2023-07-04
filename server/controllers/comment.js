import Comment from "../models/Comments.js";
import Post from "../models/Post.js";
import mongoose from "mongoose";
const toId = mongoose.Types.ObjectId;

export const createComment = async (req, res) => {
  try {
    const {description, postId} = req.body;
    const newComment = new Comment({
      description,
    });
    await newComment.save();

    var allComments = await Comment.find().sort({ createdAt: 1 });

    var commentArray = [];

    for(let i = 0; i < allComments.length; i ++)
    {
      commentArray.push(allComments[i]._id);
    }

    
    await Post.findByIdAndUpdate(postId, {comments: commentArray}, {new: true});
    
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};