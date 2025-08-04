import express from "express";
import { protect } from "../middleware/auth.js";
import { addComment, getCommentsByPost } from "../controllers/commentController.js";

const router = express.Router();

router.post("/:postId", protect, addComment); // POST /api/comments/:postId
router.get("/:postId", getCommentsByPost);    // GET /api/comments/:postId

export default router;
