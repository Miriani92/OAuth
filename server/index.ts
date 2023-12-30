import express, { Application } from "express";
import cors from "cors";
import logger from "./utils/logger";
import env from "dotenv";
import http, { Server } from "http";
import { Server as SocketServer } from "socket.io";
import authRouter from "./routes/auth.router";
import qs from "qs";

env.config();

const port = process.env.PORT || 4000;
const app: Application = express();

app.use(express.json());

app.use(cors());

app.use("/api/v1/auth", authRouter);

const server: Server = http.createServer(app);
const io: SocketServer = new SocketServer(server);

app.listen(port, () => logger.info(`port is running on port ${port}`));
