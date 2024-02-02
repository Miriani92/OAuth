import { createSlice } from "@reduxjs/toolkit";
import { getALlMessages, sendMessage } from "../actions/message.actions";

interface MessageState {
  messages: any[];
  lastMessage: any;
  isLoading: boolean;
  error: string | null;
}
const initialState: MessageState = {
  messages: [],
  lastMessage: null,
  isLoading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    messageReceived(state, { payload }) {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getALlMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getALlMessages.fulfilled, (state, { payload }) => {
        state.messages = payload;
        state.isLoading = false;
      })
      .addCase(getALlMessages.rejected, (state, action) => {
        state.error = action.error.message || "something went wrong";
        // TO DO ---> types
      });
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action: any) => {
        state.messages.push(action.payload);
        // TO DO ---> types
      })
      .addCase(sendMessage.rejected, (state, action: any) => {
        state.error = action.error.message || "something went wrong";
        // TO DO ---> types
      });
  },
});

export const { messageReceived } = messageSlice.actions;
export default messageSlice.reducer;
