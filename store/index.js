import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authReducer, authInfo } from "./slices/authSlice";
import { jobsReducer, jobsInfo, jobsListing } from "./slices/jobsSlice";
import {
  likedJobsReducer,
  liked,
  clearLikedJobs,
  removeLikedJob,
} from "./slices/likedJobsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobsReducer,
  likedJobs: likedJobsReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["likedJobs"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export {
  authInfo,
  jobsInfo,
  liked,
  jobsListing,
  clearLikedJobs,
  removeLikedJob,
};
export * from "./thunks/authApis";
export * from "./thunks/jobApis";
export * from "./thunks/likedJobsApis";
persistStore(store);
export default store;
