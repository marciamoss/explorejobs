import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authReducer, authInfo } from "./slices/authSlice";
import { jobsReducer, jobsInfo, jobsListing } from "./slices/jobsSlice";
import {
  likedJobsReducer,
  liked,
  clearLikedJobs,
} from "./slices/likedJobsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    likedJobs: likedJobsReducer,
  },
});
export { authInfo, jobsInfo, liked, jobsListing, clearLikedJobs };
export * from "./thunks/authApis";
export * from "./thunks/jobApis";
export * from "./thunks/likedJobsApis";
export default store;
