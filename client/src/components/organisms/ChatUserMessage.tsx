import React from "react";
import { ChatUserImage } from "../molecules/ChatUserImage";
import { List, ListItem, Stack, Typography, Box } from "@mui/material";
import { ChatInput } from "../molecules/ChatInput";
import { green } from "@mui/material/colors";

type ChatUserMessageProps = {
  message?: any;
  currentUser?: any;
  imageUrl?: string;
  sendTime?: string;
  isMyMessage?: boolean;
  handleSendMessage: any;
  activeChat?: any;
};

export const ChatUserMessage: React.FC<ChatUserMessageProps> = ({
  message,
  imageUrl,
  sendTime = "09:00",
  isMyMessage = false,
  currentUser,
  handleSendMessage,
  activeChat,
}) => {
  console.log("active_chat", activeChat);
  const backGroundColor = isMyMessage ? "message.primary.main" : "#4C426A";
  const justifyContent = isMyMessage ? "flex-end" : "start";
  return (
    <Stack direction="row" gap={1} justifyContent={justifyContent}>
      <List
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isMyMessage ? "flex-end" : "flex-start",
          flexDirection: "row",
          width: "70%",
          gap: 1,
        }}
      >
        {!isMyMessage && (
          <Box alignSelf="flex-start">
            <ChatUserImage imageSource={activeChat?.picture} />
          </Box>
        )}

        {/* <ChatInput handleSendMessage={handleSendMessage} /> */}
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          justifyContent="flex-end"
        >
          <ListItem
            sx={{
              textWrap: "wrap",
              backgroundColor: backGroundColor,
              borderRadius: "25px",
            }}
          >
            <Typography variant="body2">{message.content}</Typography>
          </ListItem>
        </Box>
      </List>
    </Stack>
  );
};
