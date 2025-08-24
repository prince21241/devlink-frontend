import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import ViewProfile from "./Profile/ViewProfile";
import Connections from "./Connections/Connections";
import ExploreDevelopers from "./Explore/ExploreDevelopers";
import Projects from "./Projects/Projects";
import Skills from "./Skills/Skills";
import Feed from "./Feed/Feed";
import Notifications from "./Notifications/Notifications";
import Messages from "./Messages/Messages";
import Search from "./Search/Search";
import { getAvatarWithInitials } from "../utils/defaultAvatar";
import { BellIcon, SearchIcon, MailIcon } from "../components/Icons/Icons";
import { useToast } from "../components/Toast/Toast";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [activeView, setActiveView] = useState("feed");
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();
  const { addToast } = useToast();

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

        // Fetch notification count
        fetchNotificationCount();
      } catch (err) {
        console.error("Error fetching user", err);
        navigate("/login"); // redirect if token is invalid
      }
    };

    fetchUserData();
  }, [navigate]);

  // Fetch notification count
  const fetchNotificationCount = async () => {
    try {
      const res = await API.get("/api/notifications/unread-count");
      setNotificationCount(res.data?.count || 0);
    } catch (err) {
      console.error("Error fetching notification count:", err);
      // Set count to 0 on error to avoid UI issues
      setNotificationCount(0);
    }
  };

  // Refresh notification count when switching views
  useEffect(() => {
    if (activeView === "notifications") {
      fetchNotificationCount();
    }
  }, [activeView]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    addToast("You have been logged out successfully", "success", 3000);
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
        return <Connections />;
      case "projects":
        return <Projects />;
      case "skills":
        return <Skills />;
      case "saved":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Saved Posts</h2>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        );
      case "explore":
        return <ExploreDevelopers />;
      case "notifications":
        return <Notifications />;
      case "messages":
        return <Messages />;
      case "search":
        return <Search />;
      case "feed":
      default:
        return <Feed />;
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
          <button 
            onClick={() => setActiveView("search")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Search"
          >
            <SearchIcon className="w-5 h-5 text-gray-600 hover:text-blue-600" />
          </button>
          <button 
            onClick={() => setActiveView("messages")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Messages"
          >
            <MailIcon className="w-5 h-5 text-gray-600 hover:text-blue-600" />
          </button>
          <button 
            onClick={() => setActiveView("notifications")}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Notifications"
          >
            <BellIcon className="w-5 h-5 text-gray-600 hover:text-blue-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>
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
            src={getAvatarWithInitials(user?.name, profile?.profilePicture)}
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
              { label: "Search", key: "search" },
              { label: "Messages", key: "messages" },
              { label: "My Profile", key: "profile" },
              { label: "Connections", key: "connections" },
              { label: "Projects", key: "projects" },
              { label: "Skills", key: "skills" },
              { label: "Notifications", key: "notifications", count: notificationCount },
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
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  {item.count > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.count > 9 ? '9+' : item.count}
                    </span>
                  )}
                </div>
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
