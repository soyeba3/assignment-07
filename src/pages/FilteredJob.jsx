import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Job from "../components/Job";
import Spinner from "../components/spinner/Spinner";
import { fetchJobs } from "../features/jobsSlice";

const FilteredJob = () => {
  const { jobs, loading, error, errorMessage } = useSelector(
    (state) => state.jobs
  );
  const { inputValue } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { type } = useParams();

  const filteredJob = jobs.filter((job) => {
    const jobType = job.type.replaceAll(" ", "").toLowerCase();
    return jobType === type;
  });

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const filterByInput = (item) => {
    return item?.title?.toLowerCase().includes(inputValue);
  };

  //decide what to render

  let content;

  if (loading) content = <Spinner />;

  if (!loading && error) {
    content = <div>{errorMessage}</div>;
  }

  if (!loading && !error && jobs.length === 0) {
    content = <div>No Jobs Found</div>;
  }

  if (!loading && !error && jobs.length > 0) {
    content = filteredJob
      ?.filter(filterByInput)
      .map((item) => <Job key={item.id} item={item} />);
  }

  return (
    <div className="lg:pl-[14rem]  mt-[5.8125rem]">
      <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
        <Header />
        <div className="jobs-list">{content}</div>
      </main>
    </div>
  );
};

export default FilteredJob;
