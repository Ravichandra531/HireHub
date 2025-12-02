import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";
import { useAuth } from "../context/AuthContext";
import "../styles/jobform.css";

export default function PostJob() {
  const { token } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    skills: "",
    location: "",
    salary: "",
    experience: "",
  });

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const jobData = {
      ...form,
      salary: form.salary ? parseInt(form.salary) : null,
    };
    const { ok, data } = await apiPost("/jobs", jobData, token);
    if (ok) {
      alert("Job posted successfully!");
      nav("/jobs");
    } else {
      alert(data.error || "Failed to post job");
    }
  };

  return (
    <form className="job-form" onSubmit={submit}>
      <h2>Post Job</h2>
      <input name="title" placeholder="Job Title" onChange={handle} required />
      <input name="skills" placeholder="Required Skills (comma separated)" onChange={handle} required />
      <input name="location" placeholder="Location" onChange={handle} required />
      <input name="salary" type="number" placeholder="Salary (optional)" onChange={handle} />
      <input name="experience" placeholder="Experience Required (optional)" onChange={handle} />
      <textarea name="description" placeholder="Job Description" onChange={handle} required />
      <button>Create Job</button>
    </form>
  );
}
