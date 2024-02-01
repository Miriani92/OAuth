import React, { useState } from "react";
import { Stack, TextField, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { grey } from "@mui/material/colors";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
type ChatInputProps = {
  handleSendMessage: (content: string) => void;
};

export const ChatInput: React.FC<ChatInputProps> = ({ handleSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  const onMessageSend = () => {
    handleSendMessage(message);
    setMessage("");
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSendMessage(message);
      setMessage("");
      return;
    }
  };
  return (
    <Stack
      direction="row"
      gap={1}
      justifyContent="space-between"
      alignSelf={"center"}
      position="sticky"
      width="100%"
      paddingLeft={2}
      paddingRight={2}
      bottom={0}
    >
      <TextField
        onChange={handleChange}
        value={message}
        variant="outlined"
        size="small"
        fullWidth
        onKeyDown={handleKeyDown}
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
            width: "100%",
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
        onClick={onMessageSend}
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
