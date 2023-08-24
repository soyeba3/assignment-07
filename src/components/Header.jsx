import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setInputValue } from "../features/filterSlice";
import { fetchJobs, sortHighToLow, sortLowToHigh } from "../features/jobsSlice";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const [sortValue, setSortingValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInputValue(searchInput));
  }, [searchInput]);

  const handleChange = (e) => {
    if (e.target.value === "ascending") {
      dispatch(sortLowToHigh());
    } else if (e.target.value === "descending") {
      dispatch(sortHighToLow());
    } else if (e.target.value === "all") {
      dispatch(fetchJobs());
    }
  };

  return (
    <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
      <h1 className="lws-section-title">All Available Jobs</h1>
      <div className="flex gap-4">
        <div className="search-field group flex-1">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search Job"
            className="search-input"
            id="lws-searchJob"
          />
        </div>
        <select
          id="lws-sort"
          name="sort"
          autoComplete="sort"
          onChange={handleChange}
          className="flex-1"
        >
          <option value="all">Default</option>
          <option value="ascending">Salary (Low to High)</option>
          <option value="descending">Salary (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
