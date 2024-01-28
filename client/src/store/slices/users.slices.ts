import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../actions/users.actions";

export type User = {
  name: string;
  email: string;
  picture: string;
};

interface AuthState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  users: [],
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action: any) => {
        // TO DO ---> types
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUser.rejected, (state, action: any) => {
        // TO DO ---> types
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
