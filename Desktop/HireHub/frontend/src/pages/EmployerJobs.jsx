import { useEffect, useState } from "react";
import { apiGet } from "../api";
import { Link } from "react-router-dom";

export default function EmployerJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function loadJobs() {
      const res = await apiGet("/jobs/employer"); // backend route should return jobs for this employer
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
          <p>{job.company} | {job.location}</p>
          <p>₹ {job.salary}</p>
          <Link to={`/employer/jobs/edit/${job.id}`} className="btn-blue">Edit</Link>
        </div>
      ))}
    </div>
  );
}
