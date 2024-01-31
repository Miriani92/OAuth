import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../actions/auth.actions";

export type User = {
  _id: string;
  name: string;
  email: string;
  picture: string;
};

interface AuthState {
  user: User;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: {
    _id: "",
    name: "",
    email: "",
    picture: "",
  },
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action: any) => {
        // TO DO ---> types
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getCurrentUser.rejected, (state, action: any) => {
        // TO DO ---> types
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
