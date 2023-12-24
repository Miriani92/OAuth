import express, { Application } from "express";
import logger from "./utils/logger";
import env from "dotenv";
import http, { Server } from "http";
import { Server as SocketServer } from "socket.io";

env.config();

const port = process.env.PORT || 4000;
const app: Application = express();
const server: Server = http.createServer(app);
const io: SocketServer = new SocketServer(server);

app.listen(port, () => logger.info(`port is running on port ${port}`));
