import React, { ReactNode } from "react";
import { Box } from "@mui/material";

export const ChatInputWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Box
      component="section"
      sx={{
        width: "50%",
        backgroundColor: "chat.primary.main",
        padding: 2,
        borderRadius: "25px",
      }}
    >
      {children}
    </Box>
  );
};
