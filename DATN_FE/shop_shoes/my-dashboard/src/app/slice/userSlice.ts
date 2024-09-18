import { createSlice } from "@reduxjs/toolkit";
import { fetchGetUserInfo } from "../thunks/UserThunk";
import { any, number } from "prop-types";

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState: {
    userInfo: any,
    lstOnlineUsers: [],
  },

  reducers: {
    changelstOnlineUsers(state, action) {
      state.lstOnlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetUserInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },
});

export const { changelstOnlineUsers } = usersSlice.actions;

export default usersSlice.reducer;

export const selectUserInfo = (state) => state.users.userInfo;

export const selectLstOnlineUsers = (state) => state.users.lstOnlineUsers;
