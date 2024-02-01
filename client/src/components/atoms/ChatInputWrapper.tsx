import React, { ReactNode } from "react";
import { Box, Typography, styled, Theme } from "@mui/material";

const CustomScrollbarBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  overflowY: "auto",
  scrollbarWidth: "thin", // For Firefox
  "&::-webkit-scrollbar": {
    height: "50%",
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#24c3b0",
    borderRadius: "2px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#4C426A ",
  },
}));

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
    <CustomScrollbarBox
      component="section"
      sx={{
        display: activeChat ? "inline" : "flex",
        position: "relative",
        width: "100%",
        backgroundColor: "chat.primary.main",
        overflowY: "scroll",
        overflowX: "hidden",
        padding: 2,
        borderRadius: "25px",
        height: "100%",
        justifyContent: activeChat ? "space-between" : "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {activeChat ? children : <InactiveChat />}
    </CustomScrollbarBox>
  );
};
