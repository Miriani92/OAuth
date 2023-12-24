import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import theme from "./slices/theme_slice";

export const store = configureStore({
  reducer: { theme },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
