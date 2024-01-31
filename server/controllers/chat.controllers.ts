import { Request, Response } from "express";
import { Chat } from "../models/chat.model";
import { UserModel } from "../models/user.model";

export const addUserToChat = async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "UserId param not sent with request",
    });
  }

  let chatExists = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: res.locals.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate({
      path: "users",
      select: "-password",
      match: { _id: { $ne: res.locals.user._id } },
    })
    .populate("latestMessage");
  console.log("chatExist___", chatExists);

  let chatData = await UserModel.populate(chatExists, {
    path: "latestMessage.sender",
    select: "name picture email",
  });

  if (chatData.length > 0) {
    return res.status(200).send(chatData);
  } else {
    let newChatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [res.locals.user._id, userId],
    };

    const createdChat = await Chat.create(newChatData);
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate({
      path: "users",
      select: "-password",
      match: { _id: { $ne: res.locals.user._id } },
    });
    console.log("full_chat", FullChat);

    return res.status(200).json(FullChat);
  }
};

export const fetchChats = async (req: Request, res: Response) => {
  try {
    let results: any = await Chat.find({
      users: { $elemMatch: { $eq: res.locals.user._id } },
    })
      .populate({
        path: "users",
        select: "-password",
        match: { _id: { $ne: res.locals.user._id } },
      })
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .exec();

    results = await UserModel.populate(results, {
      path: "latestMessage.sender",
      select: "name picture email",
    });

    return res.status(200).send(results);
  } catch (error) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "something went wrong",
    });
  }
};
