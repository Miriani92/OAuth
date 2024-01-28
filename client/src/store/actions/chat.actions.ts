import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_CHAT_URL } from "../../constants/constants";

export const getChatUser = createAsyncThunk(
  "data/getChatUser",
  async (user: any) => {
    try {
      const response = await fetch(`${BASE_CHAT_URL}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
        }),
      });
      const data = await response.json();
      // TO DO ---> types: response
      return data as any;
    } catch (error) {
      throw error;
    }
  }
);
