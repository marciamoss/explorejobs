import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authReducer, authInfo } from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export { authInfo };
export * from "./thunks/authApis";
export default store;
