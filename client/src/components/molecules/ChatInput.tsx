import React from "react";
import { Stack, TextField, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { grey } from "@mui/material/colors";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";

export const ChatInput = () => {
  return (
    <Stack direction="row" gap={2}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Type a message"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SentimentSatisfiedAltIcon sx={{ color: grey[500] }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => console.log("attach_clicked")}
                edge="end"
              >
                <AttachFileIcon sx={{ color: grey[500] }} />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            color: grey[900],
            borderRadius: "25px",
            background: grey[100],
            fontSize: "14px",
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused": {
                borderColor: "transparent",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              display: "none",
            },
            "& .MuiSvgIcon-root": {
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            },
          },
        }}
      />

      <IconButton
        color="primary"
        sx={{
          borderRadius: "50%",
          backgroundColor: "#24c3b0",
          "&:hover": {
            backgroundColor: "#0aa391",
          },
        }}
      >
        <SendIcon sx={{ color: "#FDFFFF" }} />
      </IconButton>
    </Stack>
  );
};
