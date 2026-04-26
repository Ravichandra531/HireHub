import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();
  const role = user?.role;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex flex-shrink-0 items-center font-bold text-xl tracking-tight text-slate-900 hover:text-indigo-600 transition-colors">
            HireHub
          </Link>

          {token && (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
              <Link to="/jobs" className="hover:text-indigo-600 transition-colors">Find Jobs</Link>
              <Link to="/profile" className="hover:text-indigo-600 transition-colors">Profile</Link>
              {role === "EMPLOYER" && (
                <>
                  <Link to="/jobs/post" className="hover:text-indigo-600 transition-colors">Post Job</Link>
                  <Link to="/applications" className="hover:text-indigo-600 transition-colors">Applications</Link>
                  <Link to="/employer/jobs" className="hover:text-indigo-600 transition-colors">My Jobs</Link>
                  <Link to="/employer/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
                </>
              )}
              {role === "JOBSEEKER" && (
                <Link to="/applications" className="hover:text-indigo-600 transition-colors">My Applications</Link>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!token ? (
            <>
              <Link to="/login" className="hidden sm:inline-flex items-center justify-center text-sm font-medium transition-colors hover:text-indigo-600 text-slate-600 px-4 py-2">
                Sign in
              </Link>
              <Link to="/signup" className="inline-flex items-center justify-center rounded-xl font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 bg-indigo-600 text-white hover:bg-indigo-700 shadow-md h-10 px-6 text-sm">
                Create account
              </Link>
            </>
          ) : (
             <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center text-sm font-medium transition-colors hover:text-red-600 text-slate-600 px-4 h-10 border border-slate-200 hover:border-red-200 rounded-xl bg-white shadow-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
