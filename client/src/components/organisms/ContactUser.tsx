import React from "react";
import { Box, Button } from "@mui/material";
import { ChatUserImage } from "../molecules/ChatUserImage";
import { ContactPersonInfo } from "../molecules/ContactPersonInfo";
import type { User } from "../../store/slices/auth.slices";

type ContactProps = {
  [K in keyof User]: User[K];
} & {
  onClick: (user: User) => void;
};

export const ContactUser: React.FC<any> = ({ chatId, user, onClick }) => {
  const handleClick = () => {
    onClick({
      chatId,
      user: user?.name,
      picture: user.picture,
      email: user?.email,
    });
  };
  return (
    <Button onClick={handleClick}>
      <Box display="flex" justifyContent="center" gap={1}>
        <Box alignSelf="flex-start">
          <ChatUserImage imageSource={user?.picture} />
        </Box>
        <ContactPersonInfo name={user?.name} />
      </Box>
    </Button>
  );
};
