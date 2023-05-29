import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  jobs: [],
  region: {
    longitude: -122,
    latitude: 37,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09,
  },
  searchError: null,
  noListing: false,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    jobsListing(state, action) {
      state.jobs = action.payload;
    },
    jobsInfo(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { jobsInfo, jobsListing } = jobsSlice.actions;
export const jobsReducer = jobsSlice.reducer;
