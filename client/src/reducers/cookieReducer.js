import { createSlice } from "@reduxjs/toolkit";

export const cookieSlice = createSlice({
  name: "auth",
  initialState: {
    value: false,
  },
  reducers: {
    setAuthCookie: (state, action) => {
      console.log("aaya", action);
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = "";
    },
  },
});

export const { setAuthCookie, reset } = cookieSlice.actions;

export const selectAuthCookie = (state) => state.auth.value;

export default cookieSlice.reducer;
