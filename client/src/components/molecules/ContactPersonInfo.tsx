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
    <Box width="80%">
      <Box display="flex" flexDirection="column" gap={0.5}>
        <Box width={"100%"} display="flex" gap={2} alignItems="center">
          <Typography variant="body2" color={"white"} textAlign="left">
            {name}
          </Typography>
          <Typography variant="body2" color={"white"} textAlign={"right"}>
            {time}
          </Typography>
        </Box>
        <Typography
          alignSelf="flex-start"
          color={grey[500]}
          sx={{
            maxWidth: "100%",
            fontSize: "10px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {latestMessage}
        </Typography>
      </Box>
    </Box>
  );
};
