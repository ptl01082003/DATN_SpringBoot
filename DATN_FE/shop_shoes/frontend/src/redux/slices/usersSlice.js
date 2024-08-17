import { createSlice } from "@reduxjs/toolkit";
import { fetchGetUserInfo } from "../thunks/userThunk";

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState: {
    userInfo: undefined,
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
