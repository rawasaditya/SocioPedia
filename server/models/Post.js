import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.Object, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.Object, ref: "User" }],
    description: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
    },
    pictureName: String,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("Posts", postSchema);
export default Posts;
