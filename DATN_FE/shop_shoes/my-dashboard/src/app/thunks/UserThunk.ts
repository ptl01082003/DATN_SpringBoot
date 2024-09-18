import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosClient from "../../networks/AxiosRequest";
import { KEY_STORAGE } from "../../constants";

// export const fetchGetUserInfo = createAsyncThunk(
//     "users/fetchGetUserInfo",
//     async (_, thunkAPI) => {
//         const response = await AxiosClient.post("users/get-info");
//         return response.data;
//     }
// );

export const fetchGetUserInfo = createAsyncThunk(
    "users/fetchGetUserInfo",
    async (_, thunkAPI) => {
      const token = localStorage.getItem(KEY_STORAGE.TOKEN);
      const response = await AxiosClient.post(
        "users/get-info",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token lên backend
          },
        }
      );
      console.log("response", response)
      return response.data;
    }
  );
