import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

const initiateLogin =
  (authInfo, phone, captchaVerifier, app) => async (dispatch, getState) => {
    dispatch(authInfo({ loading: true }));
    const verificationId = getState().auth.verificationId;
    let token = await AsyncStorage.getItem("exploreJobs_token");
    if (token) {
      dispatch(authInfo({ token }));
    } else {
      try {
        if (!verificationId) {
          dispatch(sendCode(authInfo, phone, captchaVerifier, app));
        } else {
          dispatch(
            authInfo({
              loading: false,
              verificationId,
            })
          );
        }
      } catch (err) {
        console.log("initiateLogin error");
      }
    }
  };
const sendCode =
  (authInfo, phone, captchaVerifier, app) => async (dispatch) => {
    dispatch(authInfo({ loading: true }));
    try {
      const phoneProvider = new PhoneAuthProvider(getAuth(app));
      const verificationId = await phoneProvider.verifyPhoneNumber(
        `+1${phone}`,
        captchaVerifier
      );
      dispatch(
        authInfo({
          loading: false,
          verificationId,
        })
      );
    } catch (err) {
      dispatch(authInfo({ loading: false, codeSentError: true }));
    }
  };
const verifyCode =
  (authInfo, phone, code, app) => async (dispatch, getstate) => {
    dispatch(authInfo({ loading: true }));
    try {
      const credential = PhoneAuthProvider.credential(
        getstate().auth.verificationId,
        code
      );
      const result = await signInWithCredential(getAuth(app), credential);
      await AsyncStorage.setItem(
        "exploreJobs_token",
        result._tokenResponse.idToken
      );
      dispatch(
        authInfo({ loading: false, token: result._tokenResponse.idToken })
      );
    } catch (err) {
      dispatch(authInfo({ loading: false, verifyCodeError: true }));
    }
  };

export { initiateLogin, verifyCode, sendCode };
