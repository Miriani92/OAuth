import express from "express";
import { getUser } from "../controllers/users.controllers";
import { deserializeUser } from "../middleware/deserializeUser";

const router = express.Router();

router.get("/", [deserializeUser, getUser]);

export default router;
