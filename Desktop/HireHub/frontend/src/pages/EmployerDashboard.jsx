import { Link } from "react-router-dom";

export default function EmployerDashboard() {
  return (
    <div className="dashboard-container">
      <h2>Employer Dashboard</h2>

      <div className="dashboard-cards">
        <Link to="/jobs/post" className="dashboard-card">
          Post a Job
        </Link>

        <Link to="/employer/jobs" className="dashboard-card">
          My Jobs
        </Link>

        <Link to="/applications" className="dashboard-card">
          View Applications
        </Link>
      </div>
    </div>
  );
}
