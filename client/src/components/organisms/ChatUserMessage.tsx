import React from "react";
import { ChatUserImage } from "../molecules/ChatUserImage";
import { List, ListItem, Stack, Typography, Box } from "@mui/material";
import { green } from "@mui/material/colors";

type ChatUserMessageProps = {
  messages?: any[];
  imageUrl?: string;
  sendTime?: string;
};

export const ChatUserMessage: React.FC<ChatUserMessageProps> = ({
  messages = [
    "this is first message sfsf this is not ncie sjlfkjslj  fsjlfjsljf sjflkdjflskj",
    "this is second message this message is quite big as well right and i like it fem",
  ],
  imageUrl,
  sendTime = "09:00",
}) => {
  return (
    <Stack direction="row" gap={1}>
      <List
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          width: "70%",
          gap: 1,
        }}
      >
        <Box alignSelf="flex-start">
          <ChatUserImage />
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          {messages.map((message) => {
            return (
              <ListItem
                sx={{
                  textWrap: "wrap",
                  backgroundColor: "#4C426A",
                  borderRadius: "25px",
                }}
              >
                <Typography variant="body2">{message}</Typography>
              </ListItem>
            );
          })}
        </Box>
      </List>
    </Stack>
  );
};
