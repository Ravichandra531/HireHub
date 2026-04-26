import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

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

function Layout({ children }) {
  const location = useLocation();
  const isStandalone = location.pathname === "/login" || location.pathname === "/signup";
  const isHome = location.pathname === "/";

  if (isStandalone) {
    return <div className="min-h-screen flex flex-col bg-zinc-950">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      {isHome ? (
        <main className="flex-grow">{children}</main>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
          {children}
        </main>
      )}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
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
      </Layout>
    </BrowserRouter>
  );
}
