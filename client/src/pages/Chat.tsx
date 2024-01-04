import { Container } from "@mui/material";
import { SearchBar } from "../components";
import { ButtonOutline } from "../components";
import { ChatInput } from "../components";
import { ChatUserImage } from "../components";

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
      <SearchBar />
      <ButtonOutline text="clear chat" />
      <ButtonOutline text="more" />
      <ChatInput />
      <ChatUserImage />
    </Container>
  );
};
