import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPut } from "../api";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    type: "FULLTIME",
  });

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // Fetch job details for editing
  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem("token");

      const { ok, data } = await apiGet(`/jobs/${id}`, token);

      if (!ok) {
        setMsg("Failed to load job details");
        return;
      }

      setForm({
        title: data.title,
        company: data.company,
        location: data.location,
        salary: data.salary,
        description: data.description,
        type: data.type,
      });

      setLoading(false);
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    const token = localStorage.getItem("token");

    const { ok, data } = await apiPut(`/jobs/${id}`, form, token);

    if (!ok) {
      setMsg(data.error || "Update failed");
      return;
    }

    setMsg("Job updated successfully!");
    setTimeout(() => navigate(`/jobs/${id}`), 1000);
  };

  if (loading) return <p className="loading">Loading job...</p>;

  return (
    <div className="job-form-container">
      <form onSubmit={submit} className="job-form">
        <h2>Edit Job</h2>

        {msg && <p className="form-msg">{msg}</p>}

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />

        <select name="type" value={form.type} onChange={handleChange}>
          <option value="FULLTIME">Full Time</option>
          <option value="PARTTIME">Part Time</option>
          <option value="INTERNSHIP">Internship</option>
          <option value="REMOTE">Remote</option>
        </select>

        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          rows="5"
          required
        ></textarea>

        <button className="job-btn">Update Job</button>
      </form>
    </div>
  );
}
