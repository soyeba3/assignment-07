import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "../features/filterSlice";
import jobsSlice from "../features/jobsSlice";

const store = configureStore({
  reducer: {
    jobs: jobsSlice,
    filter: filterSlice,
  },
});

export default store;
