import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, endPoints } from "../../constants/constants";
import type { User } from "../slices/auth.slices";

export const getCurrentUser = createAsyncThunk<User>(
  "data/getCurrentUser",
  async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/auth/sessions/show_me"
      );
      const data = await response.json();
      // TO DO ---> types: response
      return { user: data?.user } as any;
    } catch (error) {
      throw error;
    }
  }
);
