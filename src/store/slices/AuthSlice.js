import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN } from "@/constants";

const initialState = {
  token: localStorage.getItem(ACCESS_TOKEN) || null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      state.token = action.payload;
      localStorage.setItem(ACCESS_TOKEN, action.payload);
    },
    signout: (state) => {
      state.token = null;
      localStorage.removeItem(ACCESS_TOKEN);
    }
  },
});

export const {
  signup,
  signout
} = authSlice.actions;

export default authSlice.reducer;