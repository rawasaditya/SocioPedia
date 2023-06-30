import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createNotif } from "../controllers/notifs.js"

const router = express.Router()

router.post('/', verifyToken, createNotif)

export default router