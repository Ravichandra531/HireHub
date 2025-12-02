import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

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
    <nav className="nav">
      <div className="nav-left">
        <Link to="/jobs" className="nav-logo">HireHub</Link>

        {token && (
          <>
            <Link to="/jobs" className="nav-link">Jobs</Link>
            <Link to="/profile" className="nav-link">Profile</Link>

            {role === "EMPLOYER" && (
              <>
                <Link to="/jobs/post" className="nav-link">Post Job</Link>
                <Link to="/applications" className="nav-link">Applications</Link>
              </>
            )}
          </>
        )}
      </div>

      <div className="nav-right">
        {!token ? (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/" className="nav-btn nav-btn-green">Signup</Link>
          </>
        ) : (
          <button onClick={logout} className="nav-btn-red">Logout</button>
        )}
      </div>
    </nav>
  );
}
