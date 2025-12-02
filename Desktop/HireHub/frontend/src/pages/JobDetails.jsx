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
      if (ok) setJob(data);
    }
    load();
  }, []);

  const apply = async () => {
    const { ok, data } = await apiPost("/applications", { jobId: parseInt(id) }, token);
    if (ok) {
      alert("Application submitted successfully!");
    } else {
      alert(data.error || "Failed to apply");
    }
  };

  const remove = async () => {
    await apiDelete(`/jobs/${id}`, token);
    window.location.href = "/jobs";
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="job-detail">
      <h2>{job.title}</h2>
      <p><strong>Posted by:</strong> {job.employer?.name || 'Unknown'}</p>
      <p><strong>Location:</strong> {job.location}</p>
      {job.salary && <p><strong>Salary:</strong> ${job.salary}</p>}
      {job.experience && <p><strong>Experience:</strong> {job.experience}</p>}
      {job.skills && <p><strong>Required Skills:</strong> {job.skills}</p>}
      <p><strong>Description:</strong></p>
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
