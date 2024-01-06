import { Container, Box } from "@mui/material";
import { ChatUserMessage, SearchBar } from "../components";
import { ButtonOutline } from "../components";
import { ChatInput } from "../components";
import { ChatUserImage } from "../components";
import { ChatInputWrapper } from "../components/atoms/ChatInputWrapper";
import { ContactsWrapper } from "../components";
import { ContactPersonInfo } from "../components";

export const Chat = () => {
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
          <ContactPersonInfo />
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
