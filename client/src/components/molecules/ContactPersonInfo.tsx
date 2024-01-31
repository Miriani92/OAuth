import React from "react";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export const ContactPersonInfo: React.FC<{
  name: string;
  time?: string;
  latestMessage?: string;
}> = ({
  name = "Jhon Doe",
  time = "09:00",
  latestMessage = "this is the last message",
}) => {
  return (
    <Box width="100%">
      <Box display="flex" alignItems="center" flexDirection="column" gap={0.5}>
        <Box
          width={"100%"}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" color={"white"}>
            {name}
          </Typography>
          <Typography variant="body2" color={"white"}>
            {time}
          </Typography>
        </Box>
        <Typography
          textAlign="start"
          width="100%"
          color={grey[500]}
          sx={{ fontSize: "12px" }}
        >
          {latestMessage}
        </Typography>
      </Box>
    </Box>
  );
};
