import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createComment } from "../controllers/comment.js";
import { upload } from "../utils/fileUploadUtils.js";

const router = express.Router();
router.post("/postcomment", createComment);

//Endpoint to be used for comments
//http://localhost:5002/api/v1/comments

export default router;
