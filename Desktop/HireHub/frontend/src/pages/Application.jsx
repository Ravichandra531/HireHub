import { useEffect, useState } from "react";
import { apiGet } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Applications() {
  const { token } = useAuth();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { ok, data } = await apiGet("/applications/my-applications", token);
    if (ok) setApps(data);
    setLoading(false);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">My Applications</h2>

      {apps.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-slate-500 text-lg">You haven't applied to any jobs yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {apps.map((app) => (
            <div key={app.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{app.job?.title || "Unknown Job"}</h3>
                  <p className="text-sm text-slate-500 mt-1">{app.job?.employer?.name || "Unknown Company"}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Applied
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {app.job?.location || "N/A"}
                </div>
                {app.job?.salary && (
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ${app.job.salary.toLocaleString()}
                  </div>
                )}
                <div className="flex items-center text-slate-400 pt-2 border-t border-slate-100 mt-4">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Applied on {new Date(app.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
