import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
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
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerJobs from "./pages/EmployerJobs";

/**
 * App component - main router setup
 *
 * Public routes: / (signup), /login, /jobs
 * Protected routes: job details, posting, editing, profile, applications
 */
export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Navbar />

        <main style={{ paddingTop: 24 }}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/jobs" element={<Jobs />} />

            {/* Protected routes */}
            <Route path="/jobs/:id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
            <Route path="/jobs/post" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
            <Route path="/jobs/edit/:id" element={<ProtectedRoute><EditJob /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />

            {/* Employer-specific routes */}
            <Route path="/employer/dashboard" element={<ProtectedRoute><EmployerDashboard /></ProtectedRoute>} />
            <Route path="/employer/jobs" element={<ProtectedRoute><EmployerJobs /></ProtectedRoute>} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/jobs" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
