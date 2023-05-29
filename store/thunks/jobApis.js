import axios from "axios";
import _ from "lodash";
import qs from "qs";
const keys = require("../../keys.js");

const buildJobsUrl = (zip, jobTitle, st) => {
  if (jobTitle) {
    keys.JOB_QUERY_PARAMS.q = jobTitle;
  }
  const query = qs.stringify({
    ...keys.JOB_QUERY_PARAMS,
    location: zip,
  });
  return `${keys.JOB.url}${query}`;
};

const reverseGeocode = async (region) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=${keys.GMAP.api_key}&result_type=postal_code`
    );
    const zip = response.data.results[0].address_components.find(
      (component) => component.types[0] === "postal_code"
    );
    return { zip: zip.long_name || zip.short_name };
  } catch (error) {
    return { zip: null };
  }
};

const fetchJobs =
  (jobsInfo, jobsListing, jobTitle, callback) => async (dispatch, getState) => {
    dispatch(jobsListing([]));
    dispatch(jobsInfo({ searching: true }));
    try {
      const { region } = getState().jobs;
      const { zip } = await reverseGeocode(region);
      const url = buildJobsUrl(zip, jobTitle, 0);
      let results = await axios.get(url);

      if (results && results?.data && results?.data?.jobs_results) {
        dispatch(jobsInfo({ searching: false }));
        dispatch(jobsListing(results?.data?.jobs_results));
        if (results?.data?.jobs_results.length === 0) {
          dispatch(jobsInfo({ noListing: true }));
        } else {
          callback();
        }
      } else {
        dispatch(jobsInfo({ noListing: true, searching: false }));
        dispatch(jobsListing([]));
      }
    } catch (e) {
      console.log("fetchJobs error", e.response.data);
      dispatch(jobsInfo({ searchError: true, searching: false }));
    }
  };
export { fetchJobs };
