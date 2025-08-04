import express from "express";
import { commentOnPost, createPost, getPublicFeed, toggleLike } from "../controllers/postController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createPost); // ✅ Protected create
router.get("/", getPublicFeed); // ✅ Public feed (for homepage)
router.post("/:postId/like", protect, toggleLike);
router.post("/:postId/comment", protect, commentOnPost);

export default router;
