import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth.slices";
import users from "./slices/users.slices";
import chat from "./slices/chat.slices";
import message from "./slices/message.slice";

export const store = configureStore({
  reducer: { auth, users, chat, message },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
