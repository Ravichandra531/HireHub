import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apiGet, apiDelete, API_URL } from "../api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function JobDetails() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const [job, setJob] = useState(null);
  const [applying, setApplying] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const { ok, data } = await apiGet(`/jobs/${id}`);
      if (ok) setJob(data);
    }
    load();
  }, [id]);

  const apply = async (e) => {
    e.preventDefault();
    setError("");
    setApplying(true);

    try {
      const formData = new FormData();
      formData.append("jobId", id);
      if (resume) {
        formData.append("resume", resume);
      }

      const response = await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Application submitted successfully!");
        setShowApplyForm(false);
        setResume(null);
      } else {
        if (data.error?.includes("resume")) {
          setError("Please upload your resume to apply for this job.");
        } else if (data.error?.includes("already applied")) {
          setError("You have already applied for this job.");
        } else {
          setError(data.error || "Failed to submit application. Please try again.");
        }
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setApplying(false);
    }
  };

  const remove = async () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setDeleting(true);
      try {
        await apiDelete(`/jobs/${id}`, token);
        navigate("/jobs");
      } catch (error) {
        alert("Failed to delete job");
        setDeleting(false);
      }
    }
  };

  if (!job) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
            <p className="text-lg text-slate-600">
              Posted by <span className="font-semibold text-slate-900">{job.employer?.name || 'Unknown'}</span>
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            {job.jobType || 'Full-time'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center text-slate-600">
            <span className="h-5 w-5 mr-2 text-xl">📍</span>
            {job.location}
          </div>
          {job.salary && (
            <div className="flex items-center text-slate-600">
              <svg className="h-5 w-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ${job.salary.toLocaleString()}
            </div>
          )}
          {job.experience && (
            <div className="flex items-center text-slate-600">
              <svg className="h-5 w-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {job.experience}
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 pt-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Job Description</h3>
          <div className="prose prose-indigo max-w-none text-slate-600 mb-8">
            <p className="whitespace-pre-wrap">{job.description}</p>
          </div>

          {job.skills && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.split(',').map((skill, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-800">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 pt-8">
          {user?.role === "JOBSEEKER" && !showApplyForm && (
            <Button onClick={() => setShowApplyForm(true)}>
              Apply Now
            </Button>
          )}

          {user?.role === "JOBSEEKER" && showApplyForm && (
            <form onSubmit={apply} className="bg-slate-50 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Submit Your Application</h3>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Resume (PDF) <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Upload your resume or we'll use the one from your profile (if available)
                </p>
              </div>



              <div className="flex gap-3">
                <Button type="submit" loading={applying}>
                  Submit Application
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setShowApplyForm(false);
                    setError("");
                  }}
                  className="px-4 py-2 text-slate-700 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {user?.role === "EMPLOYER" && user?.id === job.employer?.id && (
            <div className="flex gap-4">
              <Link to={`/jobs/edit/${job.id}`} className="btn btn-secondary">
                Edit Job
              </Link>
              <Button onClick={remove} variant="danger" loading={deleting}>
                Delete Job
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
