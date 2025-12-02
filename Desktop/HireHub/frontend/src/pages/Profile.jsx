import { useState, useEffect } from "react";
import { apiGet, apiPut } from "../api";
import { useAuth } from "../context/AuthContext";
import "../styles/profile.css";

export default function Profile() {
  const { token, user, setUser } = useAuth();
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function load() {
      const { ok, data } = await apiGet("/profile", token);
      if (ok) {
        setForm(data);
        setUser(data);
      }
    }
    load();
  }, []);

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const { ok, data } = await apiPut("/profile", form, token);
    if (ok) alert("Profile updated!");
  };

  if (!form) return <p>Loading…</p>;

  return (
    <form className="profile-form" onSubmit={submit}>
      <h2>My Profile</h2>
      <label>Name</label>
      <input name="name" value={form.name} onChange={handle} required />
      <label>Email</label>
      <input name="email" value={form.email} readOnly disabled />
      <label>Role</label>
      <input value={form.role} readOnly disabled />
      <button>Update Profile</button>
    </form>
  );
}
