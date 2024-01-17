import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import { ChatUserImage } from "../molecules/ChatUserImage";
import { ContactPersonInfo } from "../molecules/ContactPersonInfo";

export const ContactUser: React.FC<{}> = ({}) => {
  return (
    <Box display="flex" justifyContent="center" gap={1}>
      <Box alignSelf="flex-start">
        <ChatUserImage />
      </Box>
      <ContactPersonInfo />
    </Box>
  );
};
