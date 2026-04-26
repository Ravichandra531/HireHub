import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function PostJob() {
  const { token } = useAuth();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    skills: "",
    location: "",
    salary: "",
    experience: "",
    category: "",
  });

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const jobData = {
      ...form,
      salary: form.salary ? parseInt(form.salary) : null,
    };
    try {
      const { ok, data } = await apiPost("/jobs", jobData, token);
      if (ok) {
        alert("Job posted successfully!");
        nav("/jobs");
      } else {
        alert(data.error || "Failed to post job");
      }
    } catch (error) {
      alert("An error occurred while posting the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Post a New Job</h2>
      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
          <input
            name="title"
            placeholder="e.g. Senior Frontend Developer"
            onChange={handle}
            required
            className="input-field"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <input
              name="location"
              placeholder="e.g. Remote, New York, NY"
              onChange={handle}
              required
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Salary (Annual)</label>
            <input
              name="salary"
              type="number"
              placeholder="e.g. 120000"
              onChange={handle}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Required Skills</label>
          <input
            name="skills"
            placeholder="e.g. React, Node.js, TypeScript (comma separated)"
            onChange={handle}
            required
            className="input-field"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select
              name="category"
              onChange={handle}
              required
              className="input-field"
              defaultValue=""
            >
              <option value="" disabled>Select Category</option>
              <option value="Web3">Web3</option>
              <option value="DevOps">DevOps</option>
              <option value="ML">Machine Learning (ML)</option>
              <option value="Web Developer">Web Developer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Experience Required</label>
            <input
              name="experience"
              placeholder="e.g. 3+ years"
              onChange={handle}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Job Description</label>
          <textarea
            name="description"
            rows={6}
            placeholder="Describe the role, responsibilities, and requirements..."
            onChange={handle}
            required
            className="input-field resize-y"
          />
        </div>

        <div className="pt-4 flex justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => nav("/jobs")}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
          >
            Create Job
          </Button>
        </div>
      </form>
    </div>
  );
}
