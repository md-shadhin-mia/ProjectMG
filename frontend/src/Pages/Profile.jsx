import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaBriefcase, FaMapMarkerAlt, FaInfoCircle, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import fetcher from '../fetcher';
import Loading from '../UtilsComponent/Loading';

const API_BASE = import.meta.env.VITE_API_URL || "/api";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetcher.getProfile()
      .then(res => {
        setProfile(res.data);
        setFields({
          mobileNumber: res.data.mobileNumber || "",
          email: res.data.email || "",
          profession: res.data.profession || "",
          location: res.data.location || "",
          details: res.data.details || "",
          description: res.data.description || ""
        });
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  const changeHandle = (e) => {
    setFields({...fields, [e.target.name]: e.target.value});
  };

  const submitHandle = (e) => {
    e.preventDefault();
    if (!profile) return;
    setSubmitting(true);
    fetcher.updateProfile(profile.id, fields)
      .then(res => {
        setProfile(res.data);
        setEditing(false);
        setSubmitting(false);
      })
      .catch(err => {
        setError(err.response?.data?.error || "Failed to update profile");
        setSubmitting(false);
      });
  };

  if (loading) return <Loading className="flex justify-center py-20 text-indigo-500" />;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;
  if (!profile) return null;

  const initials = (profile.email || "U").charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-indigo-500 hover:text-indigo-600 any-transition">
        <FaArrowLeft /> Back to Dashboard
      </Link>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Profile</h2>
          {!editing && (
            <button onClick={() => setEditing(true)} className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-600 any-transition">
              Edit Profile
            </button>
          )}
        </div>

        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            {!imageError && profile.id ? (
              <img
                src={`${API_BASE}/profiles/${profile.id}/image`}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-50"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white ring-4 ring-gray-50">
                {initials}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{profile.email || "User"}</h3>
            <p className="text-sm text-gray-400">{profile.profession || "No profession set"}</p>
          </div>
        </div>

        {editing ? (
          <form onSubmit={submitHandle} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" name="email" value={fields.email} onChange={changeHandle} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="text" name="mobileNumber" value={fields.mobileNumber} onChange={changeHandle} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                <input type="text" name="profession" value={fields.profession} onChange={changeHandle} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" name="location" value={fields.location} onChange={changeHandle} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-400" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Details</label>
                <input type="text" name="details" value={fields.details} onChange={changeHandle} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-400" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">About Description</label>
                <textarea name="description" value={fields.description} onChange={changeHandle} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-400" />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex gap-3">
              <button type="submit" disabled={submitting} className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-600 any-transition disabled:opacity-50">
                {submitting ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={() => setEditing(false)} className="px-4 py-2 rounded-lg text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 any-transition">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <FaEnvelope className="text-indigo-400 shrink-0" />
              <div>
                <div className="text-xs text-gray-400">Email</div>
                <div className="text-sm text-gray-700">{profile.email || "—"}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <FaPhone className="text-indigo-400 shrink-0" />
              <div>
                <div className="text-xs text-gray-400">Phone</div>
                <div className="text-sm text-gray-700">{profile.mobileNumber || "—"}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <FaBriefcase className="text-indigo-400 shrink-0" />
              <div>
                <div className="text-xs text-gray-400">Profession</div>
                <div className="text-sm text-gray-700">{profile.profession || "—"}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <FaMapMarkerAlt className="text-indigo-400 shrink-0" />
              <div>
                <div className="text-xs text-gray-400">Location</div>
                <div className="text-sm text-gray-700">{profile.location || "—"}</div>
              </div>
            </div>
            {profile.details && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 md:col-span-2">
                <FaInfoCircle className="text-indigo-400 shrink-0" />
                <div>
                  <div className="text-xs text-gray-400">Details</div>
                  <div className="text-sm text-gray-700">{profile.details}</div>
                </div>
              </div>
            )}
            {profile.description && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 md:col-span-2">
                <FaInfoCircle className="text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-400">About</div>
                  <div className="text-sm text-gray-700">{profile.description}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
