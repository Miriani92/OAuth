import React from "react";
import { AppBar, Typography, Toolbar, IconButton } from "@mui/material";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { useTheme } from "../../utils/ThemeProvider";

export const NavigationBar = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <AppBar
      position="fixed"
      sx={{
        px: 4,
        display: "flex",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>OAuth</Typography>
        <IconButton aria-label="toggle" onClick={toggleTheme}>
          {isDark ? (
            <ToggleOnIcon sx={{ fontSize: 42 }} />
          ) : (
            <ToggleOffIcon sx={{ fontSize: 42 }} />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
