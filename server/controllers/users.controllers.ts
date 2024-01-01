import { Request, Response } from "express";
import logger from "../utils/logger";
export const getCurrentUser = async (req: Request, res: Response) => {
  res.status(200).json({ user: res.locals?.user || {} });
};
