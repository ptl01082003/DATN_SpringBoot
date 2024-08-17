import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../networks/AxiosClient";

export const fetchGetLstCarts = createAsyncThunk(
  "users/fetchGetLstCarts",
  async (_, thunkAPI) => {
    const response = await AxiosClient.post("carts/lst-carts");
    return response.data || {};
  }
);
