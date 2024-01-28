import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth.slices";
import users from "./slices/users.slices";
import chat from "./slices/chat.slices";

export const store = configureStore({
  reducer: { auth, users, chat },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
