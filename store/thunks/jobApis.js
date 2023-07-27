import axios from "axios";
import _ from "lodash";
import qs from "qs";
const keys = require("../../keys.js");
const buildJobsUrl = (zip, jobTitle, start) => {
  if (jobTitle) {
    keys.JOB_QUERY_PARAMS.q = jobTitle;
  } else {
    keys.JOB_QUERY_PARAMS.q = "jobs";
  }
  const query = qs.stringify({
    ...keys.JOB_QUERY_PARAMS,
    location: zip,
    start,
  });
  return `${keys.JOB.url}${query}`;
};

const reverseGeocode = async (region) => {
  try {
    const {
      data: {
        results: [{ address_components }],
      },
    } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=${keys.GMAP.api_key}&result_type=postal_code`
    );
    const zip = address_components.find(
      (component) => component.types[0] === "postal_code"
    );
    return { zip: zip.long_name || zip.short_name };
  } catch (error) {
    return { zip: null };
  }
};

const geocode = (address, jobsInfo) => async (dispatch) => {
  try {
    const {
      data: {
        results: [
          {
            geometry: { location },
          },
        ],
      },
    } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${keys.GMAP.api_key}`
    );
    dispatch(
      jobsInfo({
        region: {
          longitude: location.lng,
          latitude: location.lat,
          longitudeDelta: 0.04,
          latitudeDelta: 0.09,
        },
      })
    );
  } catch (error) {
    dispatch(jobsInfo({ locationChangeError: true }));
  }
};

const fetchJobs =
  (jobsInfo, jobsListing, jobTitle, numberOfJobs, callback) =>
  async (dispatch, getState) => {
    let jobs = [];
    dispatch(jobsListing([]));
    dispatch(jobsInfo({ searching: true, searchError: false }));
    try {
      const { region } = getState().jobs;
      const { zip } = await reverseGeocode(region);
      if (zip) {
        let jobApi = [axios.get(buildJobsUrl(zip, jobTitle, 0))];
        if (numberOfJobs > 10) {
          for (let i = 10; i < numberOfJobs; i = i + 10) {
            jobApi.push(axios.get(buildJobsUrl(zip, jobTitle, i)));
          }
        }
        let results = await Promise.all(jobApi);

        for (let i = 0; i < numberOfJobs; i = i + 10) {
          if (!results[i / 10]?.data?.error) {
            jobs = [...jobs, ...results[i / 10]?.data?.jobs_results];
          }
        }

        if (jobs.length) {
          dispatch(jobsInfo({ searching: false }));
          dispatch(jobsListing(jobs));
          if (jobs.length === 0) {
            dispatch(jobsInfo({ noListing: true }));
          } else {
            callback();
          }
        } else {
          dispatch(jobsInfo({ noListing: true, searching: false }));
          dispatch(jobsListing([]));
        }
      } else {
        dispatch(jobsInfo({ searchError: true, searching: false }));
      }
    } catch (e) {
      dispatch(jobsInfo({ searchError: true, searching: false }));
    }
  };
export { fetchJobs, geocode };
