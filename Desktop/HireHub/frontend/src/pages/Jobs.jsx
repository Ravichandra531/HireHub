import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Jobs() {
  const { token, user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [location, setLocation] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12; // items per page

  const [totalPages, setTotalPages] = useState(1);

  // Load categories once
  useEffect(() => {
    const fetchCategories = async () => {
      const { ok, data } = await apiGet("/jobs/categories");
      if (ok) setCategories(data);
    };
    fetchCategories();
  }, []);

  // Load jobs whenever filters change
  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      const query = new URLSearchParams({
        search,
        category,
        jobType,
        location,
        minSalary,
        maxSalary,
        page: page.toString(),
        limit: limit.toString()
      });
      const { ok, data } = await apiGet(`/jobs?${query.toString()}`);
      if (ok) {
        setJobs(data.jobs);
        setTotalPages(data.pagination.totalPages);
      }
      setLoading(false);
    };
    loadJobs();
  }, [search, category, jobType, location, minSalary, maxSalary, page]);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  if (loading && page === 1 && jobs.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Find Your Dream Job</h2>
          <p className="text-slate-500 mt-1">Browse through thousands of job opportunities</p>
        </div>
        {user?.role === "EMPLOYER" && (
          <Link to="/jobs/post" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
            Post New Job
          </Link>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Filters</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Search</label>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  <option value="All">All Categories</option>
                  <option value="Web3">Web3</option>
                  <option value="DevOps">DevOps</option>
                  <option value="ML">Machine Learning (ML)</option>
                  <option value="Web Developer">Web Developer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Type</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  <option value="All">All Types</option>
                  <option value="FULLTIME">Full‑time</option>
                  <option value="PARTTIME">Part‑time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="REMOTE">Remote</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="City or Country"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Salary Range</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    className="w-1/2 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                    className="w-1/2 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Grid */}
        <div className="lg:w-3/4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-slate-900">No jobs found</h3>
              <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {jobs.map((job) => (
                <Link to={`/jobs/${job.id}`} className="block group" key={job.id}>
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-200 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0 pr-4">
                        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {job.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1 truncate">
                          {job.employer?.name || "Unknown Company"}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 whitespace-nowrap">
                        {job.jobType?.replace(/_/g, " ") || "Full‑time"}
                      </span>
                    </div>

                    <div className="mt-auto space-y-3">
                      <div className="flex items-center text-sm text-slate-500">
                        <span className="flex-shrink-0 mr-1.5 text-lg">📍</span>
                        <span className="truncate">{job.location}</span>
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
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Previous
              </button>
              <span className="text-slate-600 text-sm font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
