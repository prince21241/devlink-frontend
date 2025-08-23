import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import ViewProfile from "./Profile/ViewProfile";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [activeView, setActiveView] = useState("feed");
  const navigate = useNavigate();

  // Fetch user and profile on load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user info
        const userRes = await API.get("/api/auth/me");
        setUser(userRes.data);

        // Try to fetch profile for profile picture
        try {
          const profileRes = await API.get("/api/profile/me");
          setProfile(profileRes.data);
        } catch (profileErr) {
          // If no profile exists, that's okay - we'll use default avatar
          console.log("No profile found, using default avatar");
        }
      } catch (err) {
        console.error("Error fetching user", err);
        navigate("/login"); // redirect if token is invalid
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    navigate("/");
  };

  // Refresh profile data (called when profile is updated)
  const refreshProfile = async () => {
    try {
      const profileRes = await API.get("/api/profile/me");
      setProfile(profileRes.data);
    } catch (err) {
      console.log("No profile found");
      setProfile(null);
    }
  };

  // Render different content based on active view
  const renderMainContent = () => {
    switch (activeView) {
      case "profile":
        return <ViewProfile onProfileUpdate={refreshProfile} />;
      case "connections":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Connections</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        );
      case "projects":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Projects</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        );
      case "skills":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Skills</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        );
      case "saved":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Saved Posts</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        );
      case "explore":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Explore Developers</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        );
      case "feed":
      default:
        return (
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4">Recent Posts</h2>
            <input
              placeholder="Share a post..."
              className="w-full px-4 py-2 border border-gray-300 rounded mb-6 text-sm sm:text-base"
            />
            <div className="space-y-4">
              <PostCard
                name={user?.name || "You"}
                text="Just deployed my new portfolio site! 🚀"
                profilePicture={profile?.profilePicture}
              />
              <PostCard
                name={user?.name || "You"}
                text="Started learning TypeScript. Excited to dive in!"
                profilePicture={profile?.profilePicture}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow px-4 sm:px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">DevLink</h1>
        <h2 className="text-lg font-semibold hidden sm:block">
          {user ? `Welcome, ${user.name}!` : "Welcome!"}
        </h2>
        <div className="flex items-center gap-4 text-sm">
          <button title="Search">🔍</button>
          <button title="Notifications">🔔</button>
          <button
            onClick={handleLogout}
            className="text-red-500 font-semibold hover:underline"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Layout Container */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r p-6 text-center lg:text-left">
          <img
            src={profile?.profilePicture || "https://i.pravatar.cc/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto lg:mx-0 object-cover border-2 border-gray-200"
          />
          <h3 className="text-lg font-semibold mt-2">{user?.name || "..."}</h3>
          <p className="text-sm text-gray-500">
            {profile?.bio ? profile.bio.substring(0, 50) + (profile.bio.length > 50 ? "..." : "") : "Full Stack Developer"}
          </p>
          <button 
            onClick={() => setActiveView("profile")}
            className="text-blue-600 text-sm mt-1 inline-block hover:underline"
          >
            {profile ? "Edit Profile" : "Create Profile"}
          </button>

          <nav className="mt-6 space-y-2">
            {[
              { label: "Feed", key: "feed" },
              { label: "My Profile", key: "profile" },
              { label: "Connections", key: "connections" },
              { label: "Projects", key: "projects" },
              { label: "Skills", key: "skills" },
              { label: "Saved Posts", key: "saved" },
              { label: "Explore Developers", key: "explore" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveView(item.key)}
                className={`block w-full text-left px-3 py-2 rounded font-medium transition-colors ${
                  activeView === item.key
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

// Post card component
function PostCard({ name, text, profilePicture }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={profilePicture || "https://i.pravatar.cc/40"}
          className="w-10 h-10 rounded-full object-cover"
          alt="User"
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-gray-500">Just now</p>
        </div>
      </div>
      <p>{text}</p>
    </div>
  );
}
