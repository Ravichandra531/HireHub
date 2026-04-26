import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiPut } from "../api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    skills: "",
    location: "",
    salary: "",
    experience: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");


  useEffect(() => {
    const fetchJob = async () => {
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
  }, [id, token]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setSubmitting(true);

    const jobData = {
      ...form,
      salary: form.salary ? parseInt(form.salary) : null,
    };

    try {
      const { ok, data } = await apiPut(`/jobs/${id}`, jobData, token);

      if (!ok) {
        setMsg(data.error || "Update failed");
        return;
      }

      setMsg("Job updated successfully!");
      setTimeout(() => navigate(`/jobs/${id}`), 1000);
    } catch (error) {
      setMsg("An error occurred while updating the job.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Edit Job</h2>

      {msg && (
        <div className={`mb-6 p-4 rounded-md ${msg.includes("success") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
          {msg}
        </div>
      )}

      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Required Skills</label>
          <input
            type="text"
            name="skills"
            placeholder="Required Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Salary (Annual)</label>
            <input
              type="number"
              name="salary"
              placeholder="Salary (optional)"
              value={form.salary}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Experience Required</label>
          <input
            type="text"
            name="experience"
            placeholder="Experience Required (optional)"
            value={form.experience}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Job Description</label>
          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            rows="6"
            required
            className="input-field resize-y"
          ></textarea>
        </div>

        <div className="pt-4 flex justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(`/jobs/${id}`)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button type="submit" loading={submitting}>
            Update Job
          </Button>
        </div>
      </form>
    </div>
  );
}
