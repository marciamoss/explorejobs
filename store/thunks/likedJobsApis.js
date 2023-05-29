import axios from "axios";
import _ from "lodash";
const keys = require("../../keys.js");

const likeJob = (liked, job) => async (dispatch) => {
  let apply_options = [];
  const apply = await axios.get(
    `${keys.JOB.url}engine=${keys.JOBDETAILS.jde}&q=${job.job_id}&api_key=${keys.SEARCH.api_key}`
  );
  apply_options = _.uniqBy(apply?.data?.apply_options, "link");
  job = { ...job, apply_options };
  dispatch(liked(job));
};
export { likeJob };
