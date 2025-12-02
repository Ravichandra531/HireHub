// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Signup from "./pages/signup";
import Login from "./pages/login";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import EditJob from "./pages/EditJob";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";
import Applications from "./pages/Application";

/**
 * App component - main router setup
 *
 * Notes:
 * - Public routes: / (signup), /login, /jobs
 * - Job details, posting, editing, profile, applications are protected (require authentication)
 * - If you prefer some pages public (e.g. job details), remove the ProtectedRoute wrapper
 */
export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Navbar />

        <main style={{ paddingTop: 24 }}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/jobs" element={<Jobs />} />

            {/* Protected routes */}
            <Route
              path="/jobs/:id"
              element={
                <ProtectedRoute>
                  <JobDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/jobs/post"
              element={
                <ProtectedRoute>
                  <PostJob />
                </ProtectedRoute>
              }
            />

            <Route
              path="/jobs/edit/:id"
              element={
                <ProtectedRoute>
                  <EditJob />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/applications"
              element={
                <ProtectedRoute>
                  <Applications />
                </ProtectedRoute>
              }
            />

            {/* Fallback: redirect unknown routes to jobs */}
            <Route path="*" element={<Navigate to="/jobs" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
