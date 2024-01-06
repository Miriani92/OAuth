import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

export const SearchBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const searchBarWidth = isSmallScreen
    ? { maxWidth: "300px" }
    : { width: "300px" };

  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder="Search"
      sx={{
        bgcolor: "chat.primary.main",
        borderRadius: "25px",
        height: "50px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        ...searchBarWidth,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="disabled" />
          </InputAdornment>
        ),
        sx: {
          color: grey[100],
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
  );
};
