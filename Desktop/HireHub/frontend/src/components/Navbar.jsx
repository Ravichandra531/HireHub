import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">HireHub</span>
            </Link>

            {token && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/jobs" className="border-transparent text-slate-500 hover:border-indigo-500 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Jobs
                </Link>
                <Link to="/profile" className="border-transparent text-slate-500 hover:border-indigo-500 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Profile
                </Link>

                {role === "EMPLOYER" && (
                  <>
                    <Link to="/jobs/post" className="border-transparent text-slate-500 hover:border-indigo-500 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Post Job
                    </Link>
                    <Link to="/applications" className="border-transparent text-slate-500 hover:border-indigo-500 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Applications
                    </Link>
                    <Link to="/employer/jobs" className="border-transparent text-slate-500 hover:border-indigo-500 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      My Jobs
                    </Link>
                    <Link to="/employer/dashboard" className="border-transparent text-slate-500 hover:border-indigo-500 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Dashboard
                    </Link>
                  </>
                )}

                {role === "JOBSEEKER" && (
                  <>
                    <Link to="/applications" className="border-transparent text-slate-500 hover:border-indigo-500 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      My Applications
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center">
            {!token ? (
              <div className="flex space-x-4">
                <Link to="/login" className="text-slate-500 hover:text-slate-700 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Sign up
                </Link>
              </div>
            ) : (
              <button
                onClick={logout}
                className="ml-4 bg-white text-slate-500 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium border border-slate-200 hover:border-red-200 transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
