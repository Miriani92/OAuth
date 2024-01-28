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
    .populate("users", "-password")
    .populate("latestMessage");

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

    res.status(200).json(FullChat);
  }

  return;
};

// ui perspective what i want ot achieve is that
// click ---> send the user that we want to have chat with
// add the chat ---> we add this user in the chat
// update the chats ---> when we add the user we send back the chat users that we have and we display this users on the sidebar with the latest message
//
