import express, { Application } from "express";
import cors from "cors";
import logger from "./utils/logger";
import env from "dotenv";
import http, { Server } from "http";
import { Server as SocketServer } from "socket.io";
import authRouter from "./routes/auth.router";
import { connectDB } from "./utils/connectDb";

env.config();

const port = process.env.PORT || 4000;
const app: Application = express();

app.use(express.json());

app.use(cors());

app.use("/api/v1/auth", authRouter);

const server: Server = http.createServer(app);
const io: SocketServer = new SocketServer(server);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI || "");
    logger.info("connected to db");
    app.listen(port, () => logger.info(`server is running on port ${port}`));
  } catch (error) {
    logger.error(error, "failed to start server");
  }
};
start();
