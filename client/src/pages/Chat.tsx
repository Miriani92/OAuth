import { useEffect, useState } from "react";
import { Box, Typography, useScrollTrigger } from "@mui/material";
import io from "socket.io-client";
import { ChatUserMessage, SearchBar } from "../components";
import { ButtonOutline } from "../components";
import { ChatInput } from "../components";
import { ChatInputWrapper } from "../components/atoms/ChatInputWrapper";
import { ContactsWrapper } from "../components";
import { ContactUser } from "../components";
import { ChatUserImage } from "../components";
import { useAppSelector } from "../hooks/use_store";
import { SOCKET_CONNECTION_URI } from "../constants/constants";
import { getUser } from "../store/actions/users.actions";
import { useAppDispatch } from "../hooks/use_store";
import { setActiveChat } from "../store/slices/chat.slices";
import { getChatUser } from "../store/actions/chat.actions";
import { getALlMessages, sendMessage } from "../store/actions/message.actions";
import { CustomScrollbarBox } from "../components/atoms/ChatInputWrapper";
import { messageReceived } from "../store/slices/message.slice";
import { deleteMessages } from "../store/actions/message.actions";

const socket = io(SOCKET_CONNECTION_URI);

export const Chat = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { users } = useAppSelector((state) => state.users);
  const {
    chats,
    isLoading: isChatDataLoading,
    activeChat,
  } = useAppSelector((state) => state.chat);
  const { messages } = useAppSelector((state) => state.message);
  const [activeUsers, setActiveUsers] = useState<any>(null);

  const dispatch = useAppDispatch();

  const handleSearch = (search: string) => {
    dispatch(getUser(search));
  };

  const handleClickChat = (chatData: any) => {
    dispatch(setActiveChat(chatData));
  };

  const handleSendMessage = async (content: string) => {
    const { payload } = await dispatch(
      sendMessage({ content, chatId: activeChat.chatId })
    );
    socket.emit("new message", { ...payload, _id: activeChat._id });
  };

  const handleDeleteAllMessages = async () => {
    if (activeChat?.chatId) {
      await dispatch(deleteMessages(activeChat.chatId));
      await dispatch(getALlMessages(activeChat.chatId));
      socket.emit("messages deleted", user?._id);
    }
  };

  useEffect(() => {
    socket.emit("setup", user);
  }, [user]);

  useEffect(() => {
    if (activeChat?.chatId) {
      dispatch(getALlMessages(activeChat.chatId));
    }
  }, [activeChat, dispatch]);

  useEffect(() => {
    socket.on("message received", (data) => {
      if (data?.sender?._id !== user._id) {
        dispatch(messageReceived(data));
      }
    });

    socket.on("setup", (activeUsers: any) => {
      console.log("setup___event____", activeUsers);
      setActiveUsers(activeUsers);
    });
    socket.on("update users", (activeUsers: any) => {
      console.log("updateUsers");
      setActiveUsers(activeUsers);
    });
  }, [socket]);

  // TO-DO --->refactor loading functionality
  if (isChatDataLoading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        bgcolor: "chat.secondary.main",
        padding: 4,
        flex: 1,
        height: "100vh",
      }}
    >
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={4}
      >
        <SearchBar
          onSearch={handleSearch}
          searchResults={users}
          getChatUser={getChatUser}
        />
        <Typography variant="body2">Hello {user.name.toUpperCase()}</Typography>
        <ChatUserImage imageSource={user.picture} isActive={true} />

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <ButtonOutline text="clear chat" onClick={handleDeleteAllMessages} />
          <ButtonOutline text="more" />
        </Box>
      </Box>
      <Box
        display="flex"
        position="relative"
        alignItems="flex-start"
        gap={4}
        width="100%"
        height={"90%"}
        overflow="hidden"
      >
        <ContactsWrapper>
          {chats.length
            ? chats.map((chat, idx) => {
                let isActive = false;
                if (activeUsers) {
                  if (activeUsers[chat?.users[0]?._id]) {
                    isActive = true;
                  }
                }
                return (
                  <ContactUser
                    chatId={chat?._id}
                    user={chat?.users[0]}
                    key={idx}
                    onClick={handleClickChat}
                    latestMessage={chat.latestMessage?.content}
                    activeChat={activeChat}
                    isActive={isActive}
                  />
                );
              })
            : null}
        </ContactsWrapper>
        <ChatInputWrapper activeChat={activeChat}>
          <CustomScrollbarBox
            sx={{
              height: "92%",
              overflowY: "scroll",
              overflowX: "hidden",
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            {messages.map((message: any) => {
              const isMyMessage = user._id === message.sender._id;
              return (
                <ChatUserMessage
                  key={message._id}
                  message={message}
                  currentUser={user}
                  isMyMessage={isMyMessage}
                  handleSendMessage={handleSendMessage}
                  activeChat={activeChat}
                />
              );
            })}
          </CustomScrollbarBox>
          <ChatInput handleSendMessage={handleSendMessage} />
        </ChatInputWrapper>
      </Box>
    </Box>
  );
};
