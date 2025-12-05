import { Link } from "react-router-dom";

export default function EmployerDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Employer Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/jobs/post" className="block p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-500 transition-all duration-200 group">
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4 group-hover:bg-indigo-600 transition-colors">
            <svg className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Post a Job</h3>
          <p className="text-slate-500">Create a new job listing to find the perfect candidate.</p>
        </Link>

        <Link to="/employer/jobs" className="block p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-500 transition-all duration-200 group">
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4 group-hover:bg-indigo-600 transition-colors">
            <svg className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">My Jobs</h3>
          <p className="text-slate-500">Manage your existing job listings and view details.</p>
        </Link>

        <Link to="/applications" className="block p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-500 transition-all duration-200 group">
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4 group-hover:bg-indigo-600 transition-colors">
            <svg className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">View Applications</h3>
          <p className="text-slate-500">Review applications from candidates for your jobs.</p>
        </Link>
      </div>
    </div>
  );
}
