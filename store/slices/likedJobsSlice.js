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
    removeLikedJob(state, action) {
      state.likedJobs = state.likedJobs.filter(
        (j) => j.job_id !== action.payload
      );
    },
  },
});

export const { liked, clearLikedJobs, removeLikedJob } = likedJobsSlice.actions;
export const likedJobsReducer = likedJobsSlice.reducer;
