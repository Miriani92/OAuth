import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { addUserToChat } from "../controllers/chat.controllers";

const router = express.Router();
router.post("/", [deserializeUser, addUserToChat]);

export default router;
