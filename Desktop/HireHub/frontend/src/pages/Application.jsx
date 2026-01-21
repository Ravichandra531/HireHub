import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiPut, API_URL } from "../api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function Applications() {
  const { token, user } = useAuth();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const role = user?.role;
  const isEmployer = role === "EMPLOYER";

  useEffect(() => {
    loadData();
  }, [role]);

  const loadData = async () => {
    try {
      const endpoint = isEmployer ? "/applications/employer/all" : "/applications/my-applications";
      const { ok, data } = await apiGet(endpoint, token);

      if (ok) {
        setApps(data);
      } else {
        setError(data.error || "Failed to load applications");
      }
    } catch (err) {
      console.error("Error loading applications:", err);
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to mark this as ${newStatus}?`)) return;

    setUpdatingStatus(id);
    const { ok } = await apiPut(`/applications/${id}/status`, { status: newStatus }, token);
    if (ok) {
      // Refresh local state
      setApps(apps.map(app => app.id === id ? { ...app, status: newStatus } : app));
    } else {
      alert("Failed to update status");
    }
    setUpdatingStatus(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACCEPTED": return "bg-green-100 text-green-800 border-green-200";
      case "REJECTED": return "bg-red-100 text-red-800 border-red-200";
      case "SHORTLISTED": return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "REVIEWED": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-yellow-50 text-yellow-800 border-yellow-200";
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <h3 className="text-red-800 font-semibold mb-2">Error Loading Applications</h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={loadData}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        {isEmployer ? "Received Applications" : "My Applications"}
      </h2>

      {apps.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="mx-auto h-12 w-12 text-slate-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900">No applications found</h3>
          <p className="mt-1 text-slate-500 max-w-sm mx-auto p-2">
            {isEmployer ? "You haven't received any applications yet." : "Start browsing jobs and apply to the ones that match your skills."}
          </p>
          {!isEmployer && (
            <Link to="/jobs" className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
              Browse Jobs
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {apps.map((app) => (
            <div key={app.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200 block">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {isEmployer ? (
                        <span>{app.user?.name || "Unknown Candidate"}</span>
                      ) : (
                        <Link to={`/jobs/${app.jobId}`} className="hover:text-indigo-600 transition-colors">
                          {app.job?.title || "Unknown Job"}
                        </Link>
                      )}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>

                  {isEmployer ? (
                    <div className="text-slate-600">
                      <p className="font-medium">Applied for: {app.job?.title}</p>
                      <p className="text-sm text-slate-500 mt-1">{app.user?.email}</p>
                    </div>
                  ) : (
                    <p className="text-slate-600 font-medium">{app.job?.employer?.name || "Unknown Company"}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm text-slate-500">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Applied on {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 mt-2 md:mt-0">
                  {app.resume && (
                    <a
                      href={app.resume.startsWith('http') ? app.resume : `${API_URL.replace('/api', '')}${app.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                      View Resume
                    </a>
                  )}

                  {isEmployer && app.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => updateStatus(app.id, 'ACCEPTED')}
                        variant="primary"
                        className="px-3 py-1 text-xs !bg-green-600 hover:!bg-green-700 focus:!ring-green-500"
                        loading={updatingStatus === app.id}
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => updateStatus(app.id, 'REJECTED')}
                        variant="danger"
                        className="px-3 py-1 text-xs"
                        loading={updatingStatus === app.id}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
