import React, { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

export const ChatInputWrapper: React.FC<{
  children: ReactNode;
  activeChat: any;
}> = ({ activeChat, children }) => {
  const InactiveChat = () => {
    return (
      <Typography variant="body2">
        Click on the sidebar user to activate chat
      </Typography>
    );
  };
  return (
    <Box
      component="section"
      sx={{
        display: activeChat ? "inline" : "flex",
        position: "relative",
        width: "100%",
        backgroundColor: "chat.primary.main",
        padding: 2,
        borderRadius: "25px",
        height: "100%",
        justifyContent: activeChat ? "space-between" : "center",
        alignItems: "center",
      }}
    >
      {activeChat ? children : <InactiveChat />}
    </Box>
  );
};
