import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createComment, getComments } from "../controllers/comment.js";
import { upload } from "../utils/fileUploadUtils.js";

const router = express.Router();
router.post("/postcomment", verifyToken, createComment);
router.get("/comment", verifyToken, getComments);

//Endpoint to be used for comments
//http://localhost:5002/api/v1/comments

export default router;
