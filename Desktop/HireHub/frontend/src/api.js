import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../api";
import { useAuth } from "../context/AuthContext";
import "../styles/auth.css";

export default function Login() {
  const { login } = useAuth();
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const { ok, data } = await apiPost("/auth/login", form);

      if (!ok) {
        // show error message, fallback to string if data.error is missing
        const errorMsg = (data && data.error) || data || "Login failed";
        return setMsg(errorMsg);
      }

      // login success: save token and user to context
      login(data.token, data.user);
      navigate("/jobs");
    } catch (err) {
      setMsg("Unexpected error. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={submit} className="auth-form">
        <h2>Login</h2>
        {msg && <p className="auth-message">{msg}</p>}
        <input
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/">Signup</Link>
        </p>
      </form>
    </div>
  );
}
