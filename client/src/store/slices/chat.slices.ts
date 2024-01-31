import { createSlice } from "@reduxjs/toolkit";
import { getChatUser } from "../actions/chat.actions";
import { getAllChats } from "../actions/chat.actions";

export type User = {
  name: string;
  email: string;
  picture: string;
};

interface ChatState {
  chats: any[];
  activeChat: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  chats: [],
  activeChat: null,
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChat(state, { payload }) {
      state.activeChat = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChatUser.fulfilled, (state, action: any) => {
        // TO DO ---> types
        state.isLoading = false;
        const isChatExists = state.chats.some(
          (chat) => chat._id === action.payload[0]._id
        );
        if (!isChatExists) {
          const isArray = Array.isArray(action.payload);
          const payload = isArray ? action.payload[0] : action.payload;
          state.chats.unshift(payload);
        }
      })
      .addCase(getChatUser.rejected, (state, action: any) => {
        // TO DO ---> types
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getAllChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllChats.fulfilled, (state, action: any) => {
        // TO DO ---> types
        state.isLoading = false;
        state.chats = action.payload || [];
      })
      .addCase(getAllChats.rejected, (state, action: any) => {
        // TO DO ---> types
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setActiveChat } = chatSlice.actions;

export default chatSlice.reducer;
