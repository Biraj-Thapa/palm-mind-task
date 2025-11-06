import express from "express";
import { getStats } from "../controllers/stats.controller.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, getStats);

export default router;