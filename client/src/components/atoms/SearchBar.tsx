import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, List, ListItemButton, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useAppDispatch } from "../../hooks/use_store";
import { getChatUser } from "../../store/actions/chat.actions";

export const SearchBar: React.FC<{
  onSearch: (searchQuery: string) => void;
  searchResults: any[];
  getChatUser: (user: any) => void;
}> = ({ onSearch, searchResults = [] }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const searchBarWidth = isSmallScreen
    ? { maxWidth: "300px" }
    : { width: "300px" };

  const handleFocus = () => {
    setFocused((e) => !e);
  };

  const handleSearch = (searchQuery: string) => {
    onSearch(searchQuery);
  };

  const onChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  const handleAddChatUser = (user: any) => {
    dispatch(getChatUser(user));
  };

  useEffect(() => {
    let timeoutId: any;
    if (searchInput !== "") {
      timeoutId = setTimeout(() => handleSearch(searchInput), 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [searchInput]);

  return (
    <Box position={"relative"}>
      <TextField
        onChange={onChange}
        variant="outlined"
        size="small"
        placeholder="Search"
        onFocus={handleFocus}
        onBlur={handleFocus}
        sx={{
          bgcolor: "chat.primary.main",
          borderRadius: focused ? 0 : "25px",
          borderTopLeftRadius: "25px",
          borderTopRightRadius: "25px",
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
      {focused && (
        <Box
          position="absolute"
          top="100%"
          width="100%"
          zIndex={10}
          sx={{ bgcolor: "chat.primary.main", borderTop: "1px solid white" }}
        >
          <List
            disablePadding
            sx={{ minHeight: 42, boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)" }}
          >
            {searchResults.map((user, idx) => {
              return (
                <ListItemButton
                  key={idx}
                  onMouseDown={() => handleAddChatUser(user)}
                >
                  {user.name}
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      )}
    </Box>
  );
};
