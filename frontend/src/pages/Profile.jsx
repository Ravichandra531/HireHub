import { useState, useEffect } from "react";
import { apiGet, apiPut } from "../api";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function Profile() {
  const { token, user, setUser } = useAuth();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const isEmployer = user?.role === "EMPLOYER";

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
    setSubmitting(true);

    const formData = new FormData();
    formData.append('name', form.name);
    if (form.phone) formData.append('phone', form.phone);
    if (form.location) formData.append('location', form.location);
    if (form.bio) formData.append('bio', form.bio);

    // Only job seekers can upload resume
    if (!isEmployer && form.resumeFile) {
      formData.append('resume', form.resumeFile);
    }

    try {
      const { ok, data } = await apiPut("/profile", formData, token);
      if (ok) {
        setForm(data);
        setUser(data);
        alert("Profile updated!");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      alert("An error occurred while updating profile");
    } finally {
      setSubmitting(false);
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {isEmployer ? "Company Profile" : "My Profile"}
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          {isEmployer
            ? "Manage your company information and details"
            : "Manage your personal information and resume"}
        </p>
      </div>

      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {isEmployer ? "Company Name" : "Full Name"}
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handle}
            required
            className="input-field"
            placeholder={isEmployer ? "e.g. Tech Corp Inc." : "e.g. John Doe"}
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
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {isEmployer ? "Contact Number" : "Phone"}
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone || ''}
            onChange={handle}
            className="input-field"
            placeholder={isEmployer ? "Company contact number" : "Your phone number"}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {isEmployer ? "Company Location" : "Location"}
          </label>
          <input
            type="text"
            name="location"
            value={form.location || ''}
            onChange={handle}
            className="input-field"
            placeholder={isEmployer ? "e.g. San Francisco, CA" : "City, Country"}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            {isEmployer ? "Company Description" : "Bio"}
          </label>
          <textarea
            name="bio"
            value={form.bio || ''}
            onChange={handle}
            rows="4"
            className="input-field resize-y"
            placeholder={isEmployer
              ? "Describe your company, culture, and what makes you unique..."
              : "Tell us about yourself, your skills, and experience..."}
          />
        </div>

        {/* Resume upload - Only for Job Seekers */}
        {!isEmployer && (
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
            <p className="mt-2 text-xs text-slate-500">
              Upload your resume in PDF, DOC, or DOCX format (Max 5MB)
            </p>
          </div>
        )}

        {/* Additional info for Employers */}
        {isEmployer && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="h-5 w-5 text-indigo-600 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-indigo-900">Employer Profile</h4>
                <p className="mt-1 text-sm text-indigo-700">
                  Your company information will be visible to job seekers when you post jobs.
                  Make sure to provide accurate and compelling details about your organization.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-200">
          <Button
            type="submit"
            loading={submitting}
            className="w-full sm:w-auto"
          >
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
}
