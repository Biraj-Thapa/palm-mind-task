import express from "express";
import { getMessages, createMessage } from "../controllers/message.controller.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, getMessages);
router.post("/", auth, createMessage);

export default router;
