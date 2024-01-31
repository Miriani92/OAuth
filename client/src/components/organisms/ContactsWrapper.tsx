import React, { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

export const ContactsWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  if (!children) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        component="section"
        sx={{
          width: "50%",
          backgroundColor: "chat.primary.main",
          padding: 2,
          borderRadius: "25px",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" color={"white"} textAlign={"center"}>
          You have no user, it can be added to the chat from the search bar
        </Typography>
      </Box>
    );
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      component="section"
      sx={{
        width: "50%",
        backgroundColor: "chat.primary.main",
        padding: 2,
        borderRadius: "25px",
        height: "100%",
      }}
    >
      {children}
    </Box>
  );
};
