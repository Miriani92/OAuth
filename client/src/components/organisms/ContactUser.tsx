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

export const ContactUser: React.FC<any> = ({
  chatId,
  user: { name, picture, email },
  onClick,
}) => {
  const handleClick = () => {
    onClick({ chatId, name, picture, email });
  };
  return (
    <Button onClick={handleClick}>
      <Box display="flex" justifyContent="center" gap={1}>
        <Box alignSelf="flex-start">
          <ChatUserImage imageSource={picture} />
        </Box>
        <ContactPersonInfo name={name} />
      </Box>
    </Button>
  );
};
