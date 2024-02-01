import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_MESSAGE_URL } from "../../constants/constants";

export const getALlMessages = createAsyncThunk(
  "data/messages",
  async (chatId: string) => {
    try {
      const response = await fetch(`${BASE_MESSAGE_URL}/${chatId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      // TO DO ---> types: response
      return data as any;
    } catch (error) {
      throw error;
    }
  }
);

export const sendMessage = createAsyncThunk(
  "data/message",
  async ({ content, chatId }: { content: string; chatId: string }) => {
    try {
      const response = await fetch(`${BASE_MESSAGE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          chatId,
        }),
        credentials: "include",
      });
      const data = await response.json();

      // TO DO ---> types: response
      return data as any;
    } catch (error) {
      throw error;
    }
  }
);
