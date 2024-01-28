import React from "react";
import { Box } from "@mui/material";
import { ChatUserImage } from "../molecules/ChatUserImage";
import { ContactPersonInfo } from "../molecules/ContactPersonInfo";
import type { User } from "../../store/slices/auth.slices";

export const ContactUser: React.FC<User> = ({ name, picture, email }) => {
  return (
    <Box display="flex" justifyContent="center" gap={1}>
      <Box alignSelf="flex-start">
        <ChatUserImage imageSource={picture} />
      </Box>
      <ContactPersonInfo name={name} />
    </Box>
  );
};
