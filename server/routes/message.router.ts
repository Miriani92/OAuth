import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/message.controllers";

const router = express.Router();

router.post("/", [deserializeUser, sendMessage]);
router.get("/:chatId", [deserializeUser, getAllMessages]);

export default router;
