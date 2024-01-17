import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

export const getCurrentUser = async (req: Request, res: Response) => {
  res.status(200).json({ user: res.locals?.user || {} });
};

export const getUser = async (req: Request, res: Response) => {
  const queryWord = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const user = await UserModel.find(queryWord).find({
    _id: { $ne: res.locals?.user._id },
  });

  return res.status(200).json(user);
};
