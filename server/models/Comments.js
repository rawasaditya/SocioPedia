import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.Object, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.Object, ref: "User" }],
    description: {
      type: String,
      required: true,
    },
    replies: [{ type: mongoose.Schema.Types.Object, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;