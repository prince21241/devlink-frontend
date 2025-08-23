import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import EditProfile from "./EditProfile";

export default function ViewProfile({ onProfileUpdate }) {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasProfile, setHasProfile] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch user info first
        const userRes = await API.get("/api/auth/me");
        setUser(userRes.data);

        // Try to fetch profile
        try {
          const profileRes = await API.get("/api/profile/me");
          setProfile(profileRes.data);
          setHasProfile(true);
        } catch (profileErr) {
          if (profileErr.response?.status === 404) {
            setHasProfile(false);
            setProfile(null);
          } else {
            setError("Error fetching profile");
          }
        }
      } catch (err) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    setIsEditing(false);
    // Refresh profile data
    setLoading(true);
    try {
      const profileRes = await API.get("/api/profile/me");
      setProfile(profileRes.data);
      setHasProfile(true);
      setError("");
      
      // Also refresh the parent component's profile data
      if (onProfileUpdate) {
        onProfileUpdate();
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setHasProfile(false);
        setProfile(null);
      } else {
        setError("Error fetching profile");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <EditProfile 
        onSave={handleSaveProfile}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!hasProfile) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Create Your Profile</h2>
        <p className="text-gray-600 mb-4">
          You haven't created your profile yet. Create one to showcase your skills and experience!
        </p>
        <button 
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Create Profile
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={profile?.profilePicture || "https://i.pravatar.cc/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
          />
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.name || "Unknown User"}
              </h1>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 md:mt-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Edit Profile
              </button>
            </div>
            <p className="text-gray-600 mb-2">{user?.email}</p>
            {profile?.location && (
              <p className="text-gray-500 mb-3">📍 {profile.location}</p>
            )}
            {profile?.bio && (
              <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      {profile?.skills && profile.skills.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {profile?.experience && profile.experience.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Experience</h2>
          <div className="space-y-4">
            {profile.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-200 pl-4">
                <h3 className="font-semibold text-lg">{exp.title}</h3>
                {exp.company && (
                  <p className="text-gray-600">{exp.company}</p>
                )}
                {exp.location && (
                  <p className="text-gray-500 text-sm">📍 {exp.location}</p>
                )}
                <p className="text-gray-500 text-sm">
                  {new Date(exp.from).toLocaleDateString()} -{" "}
                  {exp.current ? "Present" : new Date(exp.to).toLocaleDateString()}
                </p>
                {exp.description && (
                  <p className="text-gray-700 mt-2">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {profile?.education && profile.education.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          <div className="space-y-4">
            {profile.education.map((edu, index) => (
              <div key={index} className="border-l-4 border-green-200 pl-4">
                <h3 className="font-semibold text-lg">{edu.school}</h3>
                {edu.degree && (
                  <p className="text-gray-600">{edu.degree}</p>
                )}
                {edu.fieldOfStudy && (
                  <p className="text-gray-600">{edu.fieldOfStudy}</p>
                )}
                <p className="text-gray-500 text-sm">
                  {new Date(edu.from).toLocaleDateString()} -{" "}
                  {edu.current ? "Present" : new Date(edu.to).toLocaleDateString()}
                </p>
                {edu.description && (
                  <p className="text-gray-700 mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {profile?.social && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Social Links</h2>
          <div className="flex flex-wrap gap-4">
            {profile.social.github && (
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                🐙 GitHub
              </a>
            )}
            {profile.social.linkedin && (
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                💼 LinkedIn
              </a>
            )}
            {profile.social.twitter && (
              <a
                href={profile.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
              >
                🐦 Twitter
              </a>
            )}
          </div>
        </div>
      )}


    </div>
  );
}
