import { FilterQuery } from "mongoose";
import { UserModel } from "../models/user.model";
import { UserDocument } from "../models/user.model";

export const findUser = (query: FilterQuery<UserDocument>) => {
  return UserModel.findOne(query).lean();
};
