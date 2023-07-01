import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createNotif, listNotifs } from "../controllers/notifs.js"

const router = express.Router()

router.post('/', verifyToken, createNotif)
router.get('/', verifyToken, listNotifs)
router.get('/:page', verifyToken, listNotifs)

export default router