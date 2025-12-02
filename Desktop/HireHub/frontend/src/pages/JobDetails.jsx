import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGet, apiPost, apiDelete } from "../api";
import { useAuth } from "../context/AuthContext";
import "../styles/jobs.css";

export default function JobDetails() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function load() {
      const { ok, data } = await apiGet(`/jobs/${id}`, token);
      if (ok) setJob(data.job);
    }
    load();
  }, []);

  const apply = async () => {
    await apiPost("/applications", { jobId: id }, token);
    alert("Application submitted!");
  };

  const remove = async () => {
    await apiDelete(`/jobs/${id}`, token);
    window.location.href = "/jobs";
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="job-detail">
      <h2>{job.title}</h2>
      <p>{job.company}</p>
      <p>{job.description}</p>

      {user.role === "JOBSEEKER" && (
        <button onClick={apply}>Apply</button>
      )}

      {user.role === "EMPLOYER" && (
        <>
          <Link to={`/jobs/edit/${job.id}`} className="edit-btn">Edit</Link>
          <button onClick={remove} className="delete-btn">Delete</button>
        </>
      )}
    </div>
  );
}
