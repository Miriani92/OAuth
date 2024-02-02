import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import {
  getAllMessages,
  sendMessage,
  deleteMessages,
} from "../controllers/message.controllers";

const router = express.Router();

router.post("/", [deserializeUser, sendMessage]);
router.get("/:chatId", [deserializeUser, getAllMessages]);
router.delete("/:chatId", [deserializeUser, deleteMessages]);

export default router;
