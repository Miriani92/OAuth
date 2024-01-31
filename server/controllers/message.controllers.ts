import { Request, Response } from "express";
import { MessageModel } from "../models/message.model";
import { Chat } from "../models/chat.model";

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.chatId;

    const messages = await MessageModel.find({ chat: chatId })
      .populate("sender", "name picture email")
      .populate("chat");

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Failed to fetch all Messages",
    });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Invalid data passed into request",
    });
  }

  try {
    // Create a new message
    let message = await MessageModel.create({
      sender: res.locals.user._id, // Logged in user id,
      content,
      chat: chatId,
    });

    message = await (
      await message.populate("sender", "name pic")
    ).populate({
      path: "chat",
      select: "chatName isGroupChat users",
      model: "Chat",
      populate: { path: "users", select: "name email pic", model: "User" },
    });

    // Update latest message
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    return res.status(201).json(message); // Send message we just created now
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Failed to create New Message",
    });
  }

  //   res.status(200).json({ user: res.locals?.user || {} });
};
