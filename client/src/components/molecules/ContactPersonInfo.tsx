import React from "react";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export const ContactPersonInfo = () => {
  const name = "Jhon Doe";
  const time = "09:00";
  const lastMessage = "this is the last message";
  return (
    <Box width="100%">
      <Box display="flex" alignItems="center" flexDirection="column" gap={0.5}>
        <Box
          width={"100%"}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2">{name}</Typography>
          <Typography variant="body2">{time}</Typography>
        </Box>
        <Typography textAlign="start" width="100%" color={grey[500]}>
          {lastMessage}
        </Typography>
      </Box>
    </Box>
  );
};
