import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const { ok, data } = await apiPost("/auth/login", form);
      if (!ok) {
        setMsg(data.error);
        setLoading(false);
        return;
      }
      login(data.token, data.user);
      navigate("/jobs");
    } catch (error) {
      setMsg("Unable to connect to the server.");
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col font-sans transition-colors bg-slate-50">
      <header className="p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-3 font-bold text-xl tracking-wide text-indigo-600">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
             <span className="font-bold flex items-center h-full pt-1">H</span>
          </div>
          <span className="text-slate-900">HireHub</span>
        </Link>
        <Link to="/signup" className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold px-6 py-2.5 text-sm rounded-full transition-colors shadow-md shadow-indigo-600/20">
          Login / Signup
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="max-w-[400px] w-full mx-auto p-8 rounded-3xl bg-white shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="text-center mb-8 space-y-3">
            <div className="inline-flex items-center justify-center p-2 bg-indigo-50 rounded-xl text-indigo-600 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 text-sm md:text-base font-medium">Sign in to continue to your account</p>
          </div>



          <form onSubmit={submit} className="space-y-5">
            {msg && <div className="text-red-600 text-sm font-medium text-center bg-red-50 border border-red-100 py-3 rounded-lg">{msg}</div>}
            
            <div className="space-y-1.5 flex flex-col text-left">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <input 
                name="email"
                type="email" 
                required
                onChange={handleChange}
                placeholder="name@example.com" 
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium shadow-sm"
              />
            </div>

            <div className="space-y-1.5 flex flex-col text-left relative">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  required
                  onChange={handleChange}
                  placeholder="Enter your password" 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 pr-12 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium shadow-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1 pb-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-white cursor-pointer" />
              <label htmlFor="remember" className="text-sm font-medium text-slate-600 cursor-pointer select-none">Remember me</label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl h-12 transition-colors flex items-center justify-center shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm font-medium text-slate-500 mt-8">
            Don't have an account? <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors ml-1">Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
