import express from "express";
import { getHomeFeed } from "../controllers/feedController.js";

const router = express.Router();

router.get("/", getHomeFeed);

export default router;
