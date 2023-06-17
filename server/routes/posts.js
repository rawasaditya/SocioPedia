import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createPosts,
  getFeedsPosts,
  getUserPosts,
  likePost,
} from "../controllers/posts.js";
import { upload } from "../utils/fileUploadUtils.js";

const router = express.Router();
router.get("/", verifyToken, getFeedsPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.patch("/:id/like", verifyToken, likePost);
router.post("/post", verifyToken, createPosts);

export default router;
