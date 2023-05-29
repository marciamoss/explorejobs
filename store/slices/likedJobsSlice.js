import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  likedJobs: [],
};

const likedJobsSlice = createSlice({
  name: "likedJobs",
  initialState,
  reducers: {
    liked(state, action) {
      state.likedJobs = _.uniqBy(
        [action.payload, ...state.likedJobs],
        "job_id"
      );
    },
    clearLikedJobs(state, action) {
      state.likedJobs = [];
    },
  },
});

export const { liked, clearLikedJobs } = likedJobsSlice.actions;
export const likedJobsReducer = likedJobsSlice.reducer;
