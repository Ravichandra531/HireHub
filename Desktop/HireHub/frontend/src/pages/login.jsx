import { useState } from "react";
import { Link } from "react-router-dom";
import { apiPost } from "./api";
import "./auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    const { ok, data } = await apiPost("/auth/login", form);

    if (!ok) {
      setMsg(data.error);
      return;
    }

    localStorage.setItem("token", data.token);
    setMsg("Login successful!");
  };

  return (
    <div className="auth-container">
      <form onSubmit={submit} className="auth-form">
        <h2 className="auth-title">Login</h2>

        {msg && <p className="auth-message">{msg}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="auth-input"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="auth-input"
        />

        <button className="auth-button">Login</button>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/" className="auth-link">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}