import express from "express";
import { googleOauthHandler } from "../controllers/auth.controllers";

const router = express.Router();
router.get("/sessions/google", googleOauthHandler);

export default router;
