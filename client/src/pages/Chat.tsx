import { useEffect } from "react";
import { Container, Box, Divider, Typography } from "@mui/material";
import { ChatUserMessage, SearchBar } from "../components";
import { ButtonOutline } from "../components";
import { ChatInput } from "../components";
import { ChatInputWrapper } from "../components/atoms/ChatInputWrapper";
import { ContactsWrapper } from "../components";
import { ContactPersonInfo } from "../components";
import { ChatUserImage } from "../components";
import { useAppSelector } from "../hooks/use_store";
import { SOCKET_CONNECTION_URI } from "../constants/constants";
import io from "socket.io-client";

export const Chat = () => {
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    const socket = io(SOCKET_CONNECTION_URI);
    socket.emit("setup", user);
  }, [user]);

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
        <SearchBar />
        <Typography variant="body2">Hello {user.name.toUpperCase()}</Typography>
        <ChatUserImage />

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
      {/* <ChatUserImage /> */}
      <Box display="flex" alignItems="flex-start" gap={4} width="100%">
        <ContactsWrapper>
          <Box display="flex" justifyContent="center" gap={1}>
            <Box alignSelf="flex-start">
              <ChatUserImage />
            </Box>
            <ContactPersonInfo />
          </Box>
          <Divider></Divider>
          <Box display="flex" justifyContent="center" gap={1}>
            <Box alignSelf="flex-start">
              <ChatUserImage />
            </Box>
            <ContactPersonInfo />
          </Box>
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
