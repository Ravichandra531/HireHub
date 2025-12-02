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
    const { ok, data } = await apiPost("/auth/login", form);
    if (!ok) return setMsg(data.error);
    login(data.token, data.user);
    navigate("/jobs");
  };

  return (
    <div className="auth-container">
      <form onSubmit={submit} className="auth-form">
        <h2>Login</h2>
        {msg && <p className="auth-message">{msg}</p>}
        <input placeholder="Email" name="email" onChange={handleChange} />
        <input placeholder="Password" name="password" type="password" onChange={handleChange} />
        <button>Login</button>
        <p>Don't have an account? <Link to="/">Signup</Link></p>
      </form>
    </div>
  );
}
