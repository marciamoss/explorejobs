import { createSlice } from "@reduxjs/toolkit";
const keys = require("../../keys.js");
const firebaseConfig = keys.FIREBASECONFIG;

const initialState = {
  firebaseConfig,
  token: null,
  codeSentError: false,
  loading: false,
  verifyCodeError: false,
  resend: false,
  verificationId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authInfo(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { authInfo } = authSlice.actions;
export const authReducer = authSlice.reducer;
