import { useState } from "react";
import { Link } from "react-router-dom";
import { apiPost } from "./api";
import "./auth.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "JOBSEEKER",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    const { ok, data } = await apiPost("/api/auth/signup", form);

    if (!ok) {
      setMsg(data.error);
      return;
    }

    setMsg(data.message);
  };

  return (
    <div className="auth-container">
      <form onSubmit={submit} className="auth-form">
        <h2 className="auth-title">Signup</h2>

        {msg && <p className="auth-message">{msg}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="auth-input"
        />

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

        <select name="role" onChange={handleChange} className="auth-input">
          <option value="JOBSEEKER">Job Seeker</option>
          <option value="EMPLOYER">Employer</option>
        </select>

        <button className="auth-button">Signup</button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}