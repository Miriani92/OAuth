import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { addUserToChat } from "../controllers/chat.controllers";
import { fetchChats } from "../controllers/chat.controllers";

const router = express.Router();

router.post("/", [deserializeUser, addUserToChat]);
router.get("/", [deserializeUser, fetchChats]);

export default router;
