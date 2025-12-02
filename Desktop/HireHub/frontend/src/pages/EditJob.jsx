import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPut } from "../api";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    skills: "",
    location: "",
    salary: "",
    experience: "",
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
        description: data.description,
        skills: data.skills,
        location: data.location,
        salary: data.salary || "",
        experience: data.experience || "",
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

    const jobData = {
      ...form,
      salary: form.salary ? parseInt(form.salary) : null,
    };

    const { ok, data } = await apiPut(`/jobs/${id}`, jobData, token);

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
          name="skills"
          placeholder="Required Skills (comma separated)"
          value={form.skills}
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
          placeholder="Salary (optional)"
          value={form.salary}
          onChange={handleChange}
        />

        <input
          type="text"
          name="experience"
          placeholder="Experience Required (optional)"
          value={form.experience}
          onChange={handleChange}
        />

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
