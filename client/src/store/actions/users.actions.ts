import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_USERS_URL } from "../../constants/constants";

export const getUser = createAsyncThunk(
  "data/getUser",
  async (search: string) => {
    try {
      const response = await fetch(`${BASE_USERS_URL}?search=${search}`, {
        method: "GET",
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
