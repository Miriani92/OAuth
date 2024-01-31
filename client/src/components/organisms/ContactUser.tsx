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
};

export const ContactUser: React.FC<any> = ({
  chatId,
  user,
  onClick,
  latestMessage,
}) => {
  const handleClick = () => {
    onClick({
      chatId,
      user: user?.name,
      picture: user.picture,
      email: user?.email,
    });
  };
  return (
    <Button onClick={handleClick} fullWidth>
      <Box display="flex" justifyContent="center" gap={1} width={"80%"}>
        <Box alignSelf="flex-start">
          <ChatUserImage imageSource={user?.picture} />
        </Box>
        <ContactPersonInfo name={user?.name} latestMessage={latestMessage} />
      </Box>
    </Button>
  );
};
