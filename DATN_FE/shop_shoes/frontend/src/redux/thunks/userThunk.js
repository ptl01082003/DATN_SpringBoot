import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../networks/AxiosClient";

export const fetchGetUserInfo = createAsyncThunk(
  "users/fetchGetUserInfo",
  async (_, thunkAPI) => {
    const response = await AxiosClient.post("users/get-info");
    return response.data;
  }
);
