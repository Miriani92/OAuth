import express from "express";
import { googleOauthHandler } from "../controllers/auth.controllers";
import { getCurrentUser } from "../controllers/users.controllers";
import { deserializeUser } from "../middleware/deserializeUser";

const router = express.Router();
router.get("/sessions/google", googleOauthHandler);
router.get("/sessions/show_me", [deserializeUser, getCurrentUser]);

export default router;
