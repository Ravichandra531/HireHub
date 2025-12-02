import { useEffect, useState } from "react";
import { apiGet } from "../api";
import { useAuth } from "../context/AuthContext";
import "../styles/applications.css";

export default function Applications() {
  const { token } = useAuth();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { ok, data } = await apiGet("/applications/my-applications", token);
    if (ok) setApps(data);
  };

  return (
    <div className="apps-container">
      <h2 className="apps-title">My Applications</h2>

      {apps.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="apps-list">
          {apps.map((app) => (
            <div key={app.id} className="app-card">
              <h3>{app.job?.title || "Unknown Job"}</h3>
              <p><strong>Company:</strong> {app.job?.employer?.name || "Unknown"}</p>
              <p><strong>Location:</strong> {app.job?.location || "N/A"}</p>
              {app.job?.salary && <p><strong>Salary:</strong> ${app.job.salary}</p>}
              <p className="date">Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
