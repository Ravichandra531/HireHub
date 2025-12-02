import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../api";
import { useAuth } from "../context/AuthContext";
import "../styles/jobs.css";

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
    <div className="jobs-container">
      <h2>Available Jobs</h2>
      {user?.role === "EMPLOYER" && (
        <Link className="post-btn" to="/jobs/post">Post New Job</Link>
      )}

      <div className="jobs-list">
        {jobs.map((job) => (
          <Link to={`/jobs/${job.id}`} className="job-card" key={job.id}>
            <h3>{job.title}</h3>
            <p>Posted by: {job.employer?.name || 'Unknown'}</p>
            <span>{job.location}</span>
            {job.salary && <span> • ${job.salary}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
