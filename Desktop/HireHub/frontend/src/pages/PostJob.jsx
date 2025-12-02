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
    company: "",
    location: "",
    description: "",
  });

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await apiPost("/jobs", form, token);
    nav("/jobs");
  };

  return (
    <form className="job-form" onSubmit={submit}>
      <h2>Post Job</h2>
      <input name="title" placeholder="Job Title" onChange={handle} />
      <input name="company" placeholder="Company" onChange={handle} />
      <input name="location" placeholder="Location" onChange={handle} />
      <textarea name="description" placeholder="Description" onChange={handle} />
      <button>Create Job</button>
    </form>
  );
}
