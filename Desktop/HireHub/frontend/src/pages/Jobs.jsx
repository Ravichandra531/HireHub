import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Jobs() {
  const { token, user } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function load() {
      const { ok, data } = await apiGet("/jobs", token);
      if (ok) setJobs(data);
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Available Jobs</h2>
        {user?.role === "EMPLOYER" && (
          <Link className="btn btn-primary" to="/jobs/post">Post New Job</Link>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Link to={`/jobs/${job.id}`} className="block group" key={job.id}>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {job.employer?.name || 'Unknown Company'}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Full-time
                </span>
              </div>

              <div className="mt-auto space-y-3">
                <div className="flex items-center text-sm text-slate-500">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </div>
                {job.salary && (
                  <div className="flex items-center text-sm text-slate-500">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ${job.salary.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
