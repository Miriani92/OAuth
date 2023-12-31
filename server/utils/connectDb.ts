import mongoose from "mongoose";
import logger from "./logger";

export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    logger.error(error, "failed connect to db");
  }
};
