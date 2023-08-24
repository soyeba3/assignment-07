import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

// Fetch All JObs
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await axiosInstance.get("/jobs");
  return response.data;
});

// Create New Job
export const createJob = createAsyncThunk(
  "job/create",
  async ({ navigate, ...jobData }) => {
    const response = await axiosInstance.post("/jobs", jobData);
    navigate("/");
    return response.data;
  }
);

//Edit Job
export const editJob = createAsyncThunk(
  "job/edit",
  async ({ navigate, id, ...jobData }) => {
    const response = await axiosInstance.patch(`/jobs/${id}`, jobData);
    navigate("/");
    return response.data;
  }
);

//Delete Job
export const deleteJob = createAsyncThunk("job/delete", async (id) => {
  const response = await axiosInstance.delete(`/jobs/${id}`);
  return response.data;
});

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    sortLowToHigh: (state) => {
      state.jobs.sort((a, b) => Number(a.salary) - Number(b.salary));
    },
    sortHighToLow: (state) => {
      state.jobs.sort((a, b) => Number(b.salary) - Number(a.salary));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        state.error = false;
        state.errorMessage = "";
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.jobs = [];
        state.error = true;
        state.errorMessage = action.error.message;
      })
      //Create New Job
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload);
        state.error = false;
        state.errorMessage = "";
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.error.message;
      })
      //Edit Job
      .addCase(editJob.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(editJob.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorMessage = "";
      })
      .addCase(editJob.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.error.message;
      })
      //delete a job
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.filter((item) => item.id !== action.meta.arg);
        state.error = false;
        state.errorMessage = "";
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.error.message;
      });
  },
});

export default jobsSlice.reducer;
export const { sortLowToHigh, sortHighToLow } = jobsSlice.actions;
