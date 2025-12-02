import { useState } from "react";
import { apiPost } from "../api";
import { useNavigate } from "react-router-dom";

export default function CreateJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await apiPost("/jobs", form);

    if (res.ok) {
      alert("Job posted successfully!");
      navigate("/employer/jobs");
    } else {
      alert(res.data.error || "Failed to post job");
    }
  }

  return (
    <div className="form-container">
      <h2>Create New Job</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" onChange={handleChange} />
        <input name="company" placeholder="Company Name" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />
        <input name="salary" placeholder="Salary" onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Job Description"
          onChange={handleChange}
        ></textarea>

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}
