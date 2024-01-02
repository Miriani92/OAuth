import React from "react";

import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";
import { useTheme } from "@emotion/react";

export const ButtonOutline: React.FC<{ text: string }> = ({ text }) => {
  const theme = useTheme();
  return (
    <Button
      variant="outlined"
      sx={{
        borderRadius: "25px", // Adjust the border-radius as needed
        color: grey[300],
        fontSize: "12px",
        borderColor: grey[600],
        "&:hover": {
          borderColor: grey[400],
        },
      }}
    >
      {text}
    </Button>
  );
};
