import React from "react";
import { Box, Button } from "@mui/material";
import { ChatUserImage } from "../molecules/ChatUserImage";
import { ContactPersonInfo } from "../molecules/ContactPersonInfo";
import type { User } from "../../store/slices/auth.slices";

type ContactProps = {
  [K in keyof User]: User[K];
} & {
  onClick: (user: User) => void;
  latestMessage: any;
  activeChat: any;
};

export const ContactUser: React.FC<any> = ({
  chatId,
  user,
  onClick,
  latestMessage,
  activeChat,
}) => {
  const activeChatColor = activeChat?.chatId === chatId ? "#24c3b0" : "#4C426A";
  const handleClick = () => {
    onClick({
      chatId,
      user: user?.name,
      _id: user._id,
      picture: user.picture,
      email: user?.email,
    });
  };
  return (
    <Button
      onClick={handleClick}
      fullWidth
      sx={{ border: `2px solid ${activeChatColor}` }}
    >
      <Box display="flex" position="relative" gap={1} width={"100%"}>
        <Box>
          <ChatUserImage imageSource={user?.picture} />
        </Box>
        <ContactPersonInfo name={user?.name} latestMessage={latestMessage} />
      </Box>
    </Button>
  );
};
