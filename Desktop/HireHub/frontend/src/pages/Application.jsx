import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { apiGet } from "../api";
import "../styles/applications.css";

export default function Applications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { ok, data } = await apiGet("/applications");

    if (ok) setApps(data);
  };

  return (
    <>
      <Navbar />
      <div className="apps-container">
        <h2 className="apps-title">Job Applications</h2>

        {apps.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <div className="apps-list">
            {apps.map((app) => (
              <div key={app.id} className="app-card">
                <h3>{app.jobTitle}</h3>
                <p><strong>Name:</strong> {app.applicantName}</p>
                <p><strong>Email:</strong> {app.applicantEmail}</p>

                {app.resume ? (
                  <a href={app.resume} target="_blank" className="resume-link">
                    View Resume
                  </a>
                ) : (
                  <p>No resume</p>
                )}

                <p className="date">Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
