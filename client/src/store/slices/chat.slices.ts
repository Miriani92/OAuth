import { createSlice } from "@reduxjs/toolkit";
import { getChatUser } from "../actions/chat.actions";

export type User = {
  name: string;
  email: string;
  picture: string;
};

interface AuthState {
  chatUsers: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  chatUsers: [],
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChatUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChatUser.fulfilled, (state, action: any) => {
        // TO DO ---> types
        state.isLoading = false;
        state.chatUsers = action.payload.users;
      })
      .addCase(getChatUser.rejected, (state, action: any) => {
        // TO DO ---> types
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default chatSlice.reducer;
