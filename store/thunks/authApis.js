import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithCustomToken, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";
const ROOT_URL =
  "https://us-central1-one-time-password-cb0af.cloudfunctions.net";

// export const phoneStatus = () => async (dispatch) => {
//   let token = await AsyncStorage.getItem("exploreJobs_token");
//   if (token) {
//     // dispatch({ type: PHONE_LOGIN_SUCCESS, payload: token });
//     return { token };
//   } else {
//     initiateLogin(phone);
//   }
// };

const initiateLogin = (authInfo, phone) => async (dispatch) => {
  dispatch(authInfo({ loading: true }));
  let token = await AsyncStorage.getItem("exploreJobs_token");
  if (token) {
    dispatch(authInfo({ token }));
  } else {
    try {
      let {
        data: { codeValid, codeSentDate },
      } = await axios.post(`${ROOT_URL}/checkUser`, { phone });
      if (!codeValid) {
        dispatch(resendCode(authInfo, phone));
      } else {
        dispatch(
          authInfo({
            codeValid,
            codeSentDate,
            loading: false,
          })
        );
      }
    } catch (err) {
      if (err.response.data.error.code === "auth/user-not-found") {
        dispatch(createAuth(authInfo, phone));
      }
    }
  }
};

const createAuth = (authInfo, phone) => async (dispatch) => {
  try {
    await axios.post(`${ROOT_URL}/createUser`, { phone });
    await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone });
    dispatch(
      authInfo({
        codeSent: true,
        codeSentDate: new Date().toDateString(),
        loading: false,
      })
    );
  } catch (err) {
    dispatch(authInfo({ loading: false, codeSentError: true }));
  }
};

const resendCode = (authInfo, phone) => async (dispatch, getState) => {
  dispatch(authInfo({ loading: true }));
  try {
    await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone });
    dispatch(
      authInfo({
        codeSent: true,
        codeSentDate: new Date().toDateString(),
        loading: false,
        resend: false,
      })
    );
  } catch (err) {
    dispatch(authInfo({ loading: false, codeSentError: true, resend: false }));
  }
};

const verifyCode = (authInfo, phone, code) => async (dispatch, getstate) => {
  const app = initializeApp(getstate().auth.firebaseConfig);
  dispatch(authInfo({ loading: true }));
  try {
    let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
      phone,
      code,
    });
    await signInWithCustomToken(getAuth(app), data.token);
    await AsyncStorage.setItem("exploreJobs_token", data.token);
    dispatch(authInfo({ loading: false, token: data.token }));
  } catch (err) {
    dispatch(authInfo({ loading: false, verifyCodeError: true }));
  }
};

export { initiateLogin, verifyCode, resendCode };
