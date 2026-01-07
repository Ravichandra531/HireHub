import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { apiGet, apiPost, apiDelete } from "../api";
import { useAuth } from "../context/AuthContext";

export default function JobDetails() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const { ok, data } = await apiGet(`/jobs/${id}`);
      if (ok) setJob(data);
    }
    load();
  }, [id]);

  const apply = async () => {
    const { ok, data } = await apiPost("/applications", { jobId: parseInt(id) }, token);
    if (ok) {
      alert("Application submitted successfully!");
    } else {
      alert(data.error || "Failed to apply");
    }
  };

  const remove = async () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await apiDelete(`/jobs/${id}`, token);
      navigate("/jobs");
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
            Full-time
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

        <div className="border-t border-slate-200 pt-8 flex gap-4">
          {user?.role === "JOBSEEKER" && (
            <button onClick={apply} className="btn btn-primary">
              Apply Now
            </button>
          )}

          {user?.role === "EMPLOYER" && (
            <>
              <Link to={`/jobs/edit/${job.id}`} className="btn btn-secondary">
                Edit Job
              </Link>
              <button onClick={remove} className="btn btn-danger">
                Delete Job
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
