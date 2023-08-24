import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createJob, editJob } from "../features/jobsSlice";
import axiosInstance from "../utils/axios";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (id) {
      const fetchSingleProduct = async () => {
        const res = await axiosInstance.get(`/jobs/${id}`);
        setTitle(res.data.title);
        setType(res.data.type);
        setSalary(res.data.salary);
        setDeadline(res.data.deadline);
        setIsEditing(true);
      };
      fetchSingleProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "lwsJobTitle") {
      setTitle(e.target.value);
    } else if (e.target.name === "lwsJobType") {
      setType(e.target.value);
    } else if (e.target.name === "lwsJobSalary") {
      setSalary(e.target.value);
    } else if (e.target.name === "lwsJobDeadline") {
      setDeadline(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEditing) {
      dispatch(createJob({ title, type, salary, deadline, navigate }));
    } else {
      dispatch(editJob({ title, type, salary, deadline, id, navigate }));
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="fieldContainer">
        <label
          htmlFor="lws-JobTitle"
          className="text-sm font-medium text-slate-300"
        >
          Job Title
        </label>
        <select
          onChange={handleChange}
          id="lws-JobTitle"
          name="lwsJobTitle"
          value={title}
          required
        >
          <option hidden>Select Job</option>
          <option>Software Engineer</option>
          <option>Software Developer</option>
          <option>Full Stack Developer</option>
          <option>MERN Stack Developer</option>
          <option>DevOps Engineer</option>
          <option>QA Engineer</option>
          <option>Product Manager</option>
          <option>Social Media Manager</option>
          <option>Senior Executive</option>
          <option>Junior Executive</option>
          <option>Android App Developer</option>
          <option>IOS App Developer</option>
          <option>Frontend Developer</option>
          <option>Frontend Engineer</option>
        </select>
      </div>

      <div className="fieldContainer">
        <label htmlFor="lws-JobType">Job Type</label>
        <select
          onChange={handleChange}
          id="lws-JobType"
          name="lwsJobType"
          value={type}
          required
        >
          <option hidden>Select Job Type</option>
          <option>Full Time</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>
      </div>

      <div className="fieldContainer">
        <label htmlFor="lws-JobSalary">Salary</label>
        <div className="flex border rounded-md shadow-sm border-slate-600">
          <span className="input-tag">BDT</span>
          <input
            type="number"
            onChange={handleChange}
            value={salary}
            name="lwsJobSalary"
            id="lws-JobSalary"
            required
            className="!rounded-l-none !border-0"
            placeholder="20,00,000"
          />
        </div>
      </div>

      <div className="fieldContainer">
        <label htmlFor="lws-JobDeadline">Deadline</label>
        <input
          type="date"
          name="lwsJobDeadline"
          id="lws-JobDeadline"
          onChange={handleChange}
          value={deadline}
          required
        />
      </div>

      <div className="text-right">
        <button
          type="submit"
          id="lws-submit"
          className="cursor-pointer btn btn-primary w-fit"
        >
          {isEditing ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default Form;
