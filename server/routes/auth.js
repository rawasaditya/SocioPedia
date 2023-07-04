import express from "express";
import { login, register, logout,UpdateUser } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";
import { upload } from "../utils/fileUploadUtils.js";
import { getUser } from "../controllers/users.js";
import User from "../models/User.js";
const router = express.Router();
/* FILE STORAGE */

router.post("/register", upload.single("picture"), register);
router.post("/login", login);
router.get("/logout", logout);
router.patch('/:id/update',verifyToken,UpdateUser);
router.get("/isAuthenticated", verifyToken, async (req, res) => {
  const token = req.headers.authorization;
  const user = await User.findById(req.user.id)
    .select("-password")
    .populate("friends", "_id firstName lastName email location picturePath");
  res.status(200).json({ user, token });
});
export default router;
