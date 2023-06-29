import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  searchFriends,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE
router.patch("/:id/:friendsId", verifyToken, addRemoveFriend);

router.post("/search", verifyToken, searchFriends);

export default router;
