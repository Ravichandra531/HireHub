import { useState } from "react";
import { Link } from "react-router-dom";
import { apiPost } from "../api";
import "../styles/auth.css";

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
    const { ok, data } = await apiPost("/auth/signup", form);
    setMsg(ok ? data.message : data.error);
  };

  return (
    <div className="auth-container">
      <form onSubmit={submit} className="auth-form">
        <h2>Signup</h2>
        {msg && <p className="auth-message">{msg}</p>}
        <input placeholder="Name" name="name" onChange={handleChange} />
        <input placeholder="Email" name="email" onChange={handleChange} />
        <input placeholder="Password" name="password" type="password" onChange={handleChange} />
        <select name="role" onChange={handleChange}>
          <option value="JOBSEEKER">Job Seeker</option>
          <option value="EMPLOYER">Employer</option>
        </select>
        <button>Signup</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
