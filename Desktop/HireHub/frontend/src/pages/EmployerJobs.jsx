import { useEffect, useState } from "react";
import { apiGet } from "../api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function EmployerJobs() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJobs() {
      const res = await apiGet("/jobs/my-jobs", token);
      if (res.ok) setJobs(res.data);
      setLoading(false);
    }
    loadJobs();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">My Posted Jobs</h2>
        <Link to="/jobs/post" className="btn btn-primary">
          Post New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-slate-500 text-lg">You haven't posted any jobs yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200 flex flex-col h-full" key={job.id}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{job.title}</h3>
                <div className="flex items-center text-sm text-slate-500 mb-2">
                  <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </div>
                {job.salary && (
                  <div className="flex items-center text-sm text-slate-500">
                    <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ${job.salary.toLocaleString()}
                  </div>
                )}
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100 flex justify-end gap-2">
                <Link to={`/jobs/${job.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium px-3 py-1.5 rounded hover:bg-indigo-50 transition-colors">
                  View
                </Link>
                <Link to={`/jobs/edit/${job.id}`} className="text-slate-600 hover:text-slate-800 text-sm font-medium px-3 py-1.5 rounded hover:bg-slate-50 transition-colors border border-slate-200">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
