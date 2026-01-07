import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Signup from "./pages/signup";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import EditJob from "./pages/EditJob";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";
import Applications from "./pages/Application";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerJobs from "./pages/EmployerJobs";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />


            <Route path="/jobs/post" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
            <Route path="/jobs/edit/:id" element={<ProtectedRoute><EditJob /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />


            <Route path="/employer/dashboard" element={<ProtectedRoute><EmployerDashboard /></ProtectedRoute>} />
            <Route path="/employer/jobs" element={<ProtectedRoute><EmployerJobs /></ProtectedRoute>} />


            <Route path="*" element={<Navigate to="/jobs" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
