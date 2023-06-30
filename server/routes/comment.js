import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createComment,
} from "../controllers/comment.js";
import { upload } from "../utils/fileUploadUtils.js";

// router.get("/", verifyToken, getFeedsPosts);
// router.get("/:userId", verifyToken, getUserPosts);
// router.patch("/:id/like", verifyToken, likePost);
// router.post("/post", verifyToken, upload.single("picture"), createPosts);
const router = express.Router();
router.post("/postcomment", createComment);

//Endpoint to be used for comments
//http://localhost:5002/api/v1/comments


export default router;