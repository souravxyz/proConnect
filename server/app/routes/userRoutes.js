import express from "express";
import {
  getProfile,
  updateProfile,
  getUserProfileWithPosts,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/me", protect, upload.single("profilePic"), updateProfile);

// ✅ New public profile route
router.get("/:userId/profile", getUserProfileWithPosts);

export default router;
