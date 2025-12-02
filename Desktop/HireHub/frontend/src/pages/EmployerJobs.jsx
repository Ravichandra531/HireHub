import { useEffect, useState } from "react";
import { apiGet } from "../api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function EmployerJobs() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function loadJobs() {
      const res = await apiGet("/jobs/my-jobs", token);
      if (res.ok) setJobs(res.data);
    }
    loadJobs();
  }, []);

  return (
    <div className="jobs-container">
      <h2>My Posted Jobs</h2>
      {jobs.length === 0 && <p>No jobs posted yet.</p>}
      {jobs.map((job) => (
        <div className="job-card" key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.location} {job.salary && `| $${job.salary}`}</p>
          <p>Skills: {job.skills}</p>
          <Link to={`/jobs/edit/${job.id}`} className="btn-blue">Edit</Link>
        </div>
      ))}
    </div>
  );
}
