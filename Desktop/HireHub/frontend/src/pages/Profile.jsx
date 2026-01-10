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

    const formData = new FormData();
    formData.append('name', form.name);
    if (form.phone) formData.append('phone', form.phone);
    if (form.location) formData.append('location', form.location);
    if (form.bio) formData.append('bio', form.bio);
    if (form.resumeFile) formData.append('resume', form.resumeFile);

    const { ok, data } = await apiPut("/profile", formData, token);
    if (ok) {
      setForm(data);
      setUser(data);
      alert("Profile updated!");
    } else {
      alert("Failed to update profile");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, resumeFile: e.target.files[0] });
    }
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
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone || ''}
            onChange={handle}
            className="input-field"
            placeholder="Your phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location || ''}
            onChange={handle}
            className="input-field"
            placeholder="City, Country"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
          <textarea
            name="bio"
            value={form.bio || ''}
            onChange={handle}
            rows="3"
            className="input-field"
            placeholder="Tell us about yourself..."
          />
        </div>

        {/* Resume Section */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Resume</label>
          <div className="mt-1 flex items-center space-x-4">
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
          </div>
          {form.resume && !form.resumeFile && (
            <div className="mt-2 text-sm text-gray-500">
              Current Resume: <a href={`http://localhost:3002${form.resume}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-500 underline">View Resume</a>
            </div>
          )}
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
