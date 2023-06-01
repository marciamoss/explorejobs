import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

const useFeedJobs = () => {
  const { jobs } = useSelector((state) => state.jobs);
  const [jobsData, setJobsData] = useState(null);
  const [activeJobs, setActiveJobs] = useState([]);
  const [currentJobIndex, setCurrentJobIndex] = useState("");
  const [lastCard, setLastCard] = useState(false);
  const [swipeCompleted, setSwipeCompleted] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    if (jobs.length) {
      setJobsData(_.cloneDeep(jobs));
      setActiveJobs([]);
      setLastCard(false);
      setCurrentJobIndex(0);
    }
  }, [jobs]);

  useEffect(() => {
    if (swipeCompleted) {
      setCurrentJobIndex(
        jobs.findIndex((j) => j.job_id === activeJobs[0].job_id) + 1
      );
      setJobsData(jobsData.filter((j) => j.job_id !== activeJobs[0].job_id));
      setSwipeCompleted(false);
      if (jobsData.length === 1) {
        setLastCard(true);
      }
    }
  }, [swipeCompleted]);

  useEffect(() => {
    if (jobsData) {
      setTotalJobs(jobsData.length);
      if (jobsData.length > 1) {
        setActiveJobs([...[jobsData[0]], ...[jobsData[1]]]);
      } else {
        setActiveJobs([...[jobsData[0]]]);
      }
    }
  }, [jobsData]);

  return [activeJobs, lastCard, currentJobIndex, setSwipeCompleted, totalJobs];
};
export default useFeedJobs;
