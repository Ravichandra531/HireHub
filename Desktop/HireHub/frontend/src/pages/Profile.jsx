import { useState, useEffect } from "react";
import { apiGet, apiPut } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { token, user, setUser } = useAuth();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { ok, data } = await apiGet("/profile", token);
      if (ok) {
        setForm(data);
        setUser(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const { ok } = await apiPut("/profile", form, token);
    if (ok) alert("Profile updated!");
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (!form) return <p className="text-center text-red-600">Failed to load profile.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">My Profile</h2>
      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handle}
            required
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            name="email"
            value={form.email}
            readOnly
            disabled
            className="input-field bg-slate-50 text-slate-500 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
          <input
            value={form.role}
            readOnly
            disabled
            className="input-field bg-slate-50 text-slate-500 cursor-not-allowed"
          />
        </div>
        <div className="pt-4">
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
