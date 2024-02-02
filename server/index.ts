import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "./utils/logger";
import env from "dotenv";
import http, { Server } from "http";
import { Server as SocketServer } from "socket.io";
import authRouter from "./routes/auth.router";
import usersRouter from "./routes/users.router";
import chatRouter from "./routes/chat.router";
import messageRouter from "./routes/message.router";
import { connectDB } from "./utils/connectDb";

env.config();

const port = process.env.PORT || 4000;
const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);

const server: Server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: process.env.ORIGIN,
  },
  pingTimeout: 3600 * 1000,
});

const chatUsers: any = {};
io.on("connection", async (socket) => {
  socket.on("setup", (user) => {
    console.log(`User connected: ${user?.name}`);
    socket.join(user._id);
    chatUsers[user._id] = user._id;
    chatUsers[socket.id] = user._id;
    io.emit("setup", chatUsers);
  });

  socket.on("new message", (data) => {
    socket.in(data?._id).emit("message received", data);
  });
  socket.on("messages deleted", (id) => {
    socket.in(id).emit("message deleted", id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const userId = chatUsers[socket.id];
    if (userId) {
      console.log(`User disconnected: ${userId}`);
      delete chatUsers[socket.id];
      delete chatUsers[userId];
    }
    io.emit("update users", chatUsers);
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI || "");
    logger.info("connected to db");
    server.listen(port, () => logger.info(`server is running on port ${port}`));
  } catch (error) {
    logger.error(error, "failed to start server");
  }
};
start();
