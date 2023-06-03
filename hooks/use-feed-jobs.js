import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

const useFeedJobs = () => {
  const { jobs } = useSelector((state) => state.jobs);
  const [jobsData, setJobsData] = useState(null);
  const [currentJobIndex, setCurrentJobIndex] = useState("");
  const [swipeCompleted, setSwipeCompleted] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentJob, setCurrentJob] = useState(null);
  const [nextJob, setNextJob] = useState(null);

  useEffect(() => {
    if (jobs.length) {
      setJobsData(_.cloneDeep(jobs));
      setCurrentJobIndex(0);
    }
  }, [jobs]);

  useEffect(() => {
    if (swipeCompleted) {
      setCurrentJobIndex(
        jobs.findIndex((j) => j.job_id === currentJob.job_id) + 1
      );
      setJobsData(jobsData.filter((j) => j.job_id !== currentJob.job_id));
      setSwipeCompleted(false);
    }
  }, [swipeCompleted]);

  useEffect(() => {
    if (jobsData) {
      setTotalJobs(jobsData.length);
      setCurrentJob(jobsData[0]);
      setNextJob(jobsData[1]);
    }
  }, [jobsData]);

  return [currentJobIndex, setSwipeCompleted, totalJobs, currentJob, nextJob];
};
export default useFeedJobs;
