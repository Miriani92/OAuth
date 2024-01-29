import { useEffect } from "react";
import { Container, Box, Divider, Typography } from "@mui/material";
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

export const Chat = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { users, isLoading } = useAppSelector((state) => state.users);
  const {
    chats,
    isLoading: isChatDataLoading,
    activeChat,
  } = useAppSelector((state) => state.chat);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = io(SOCKET_CONNECTION_URI);
    socket.emit("setup", user);
  }, [user]);

  const handleSearch = (search: string) => {
    dispatch(getUser(search));
  };

  const handleClickChat = (chatData: any) => {
    dispatch(setActiveChat(chatData));
    // here we need to dispatch i will create dispatch
  };

  useEffect(() => {
    console.log("activeChat", activeChat);
  }, [activeChat]);

  // TO-DO --->refactor loading functionality
  if (isChatDataLoading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }
  return (
    <Container
      disableGutters={true}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        bgcolor: "chat.secondary.main",
        padding: 4,
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
        <ChatUserImage imageSource={user.picture} />

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <ButtonOutline text="clear chat" />
          <ButtonOutline text="more" />
        </Box>
      </Box>
      <Box display="flex" alignItems="flex-start" gap={4} width="100%">
        <ContactsWrapper>
          {chats.map((chat, idx) => {
            return (
              <ContactUser
                chatId={chat?._id}
                user={chat?.users[0]}
                key={idx}
                onClick={handleClickChat}
              />
            );
          })}
        </ContactsWrapper>
        <ChatInputWrapper>
          <ChatUserMessage />
          <ChatUserMessage isMyMessage />
          <ChatInput />
        </ChatInputWrapper>
      </Box>
    </Container>
  );
};
