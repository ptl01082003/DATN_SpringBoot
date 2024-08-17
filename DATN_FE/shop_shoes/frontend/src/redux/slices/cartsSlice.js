import { createSlice } from "@reduxjs/toolkit";
import { fetchGetLstCarts } from "../thunks/cartThunk";

export const cartsSlice = createSlice({
  name: "cartsSlice",
  initialState: {
    lstCarts: {},
  },
  reducers: {
     changeCarts(state, action) {
      const params = action.payload;
      state.lstCarts = params;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetLstCarts.fulfilled, (state, action) => {
      state.lstCarts = action.payload || {};
    })
  },
});

export const {changeCarts} = cartsSlice.actions;

export default cartsSlice.reducer;

export const selectCarts = (state) => state.carts.lstCarts;
