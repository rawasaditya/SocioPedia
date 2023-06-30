import Comment from "../models/Comments.js";
import Post from "../models/Post.js";
import mongoose from "mongoose";
const toId = mongoose.Types.ObjectId;

export const createComment = async (req, res) => {
  try {
    const {description, postId, listOfCommentIds} = req.body;
    const newComment = new Comment({
      description,
    });
    await newComment.save();

    //Add new Id to Comment Ref
    listOfCommentIds.push(newComment._id);
    await Post.findByIdAndUpdate(postId, {comments: listOfCommentIds}, {new: true});
    
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
