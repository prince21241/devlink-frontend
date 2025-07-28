import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/api/auth/me", {
          headers: {
            "x-auth-token": token,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user", err);
        navigate("/login"); // redirect if token is invalid
      }
    };

    fetchUser();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">DevLink</h1>
        <h2 className="text-lg font-semibold">
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

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-4">
          <div className="text-center">
            <img
              src="https://i.pravatar.cc/100"
              alt="Avatar"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h3 className="text-lg font-semibold mt-2">
              {user?.name || "..."}
            </h3>
            <p className="text-sm text-gray-500">Full Stack Developer</p>
            <a href="#" className="text-blue-600 text-sm mt-1 inline-block">
              Edit Profile
            </a>
          </div>

          <nav className="mt-6 space-y-2">
            {[
              "My Profile",
              "Connections",
              "Projects",
              "Skills",
              "Saved Posts",
              "Explore Developers",
            ].map((label) => (
              <a
                key={label}
                href="#"
                className="block px-3 py-2 rounded hover:bg-gray-100 font-medium text-gray-700"
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-xl font-bold mb-4">Recent Posts</h2>

          <input
            placeholder="Share a post..."
            className="w-full px-4 py-2 border border-gray-300 rounded mb-6"
          />

          <div className="space-y-4">
            <PostCard
              name={user?.name || "You"}
              text="Just deployed my new portfolio site! 🚀"
            />
            <PostCard
              name={user?.name || "You"}
              text="Started learning TypeScript. Excited to dive in!"
            />
          </div>
        </main>
      </div>
    </div>
  );
}

// Post card component
function PostCard({ name, text }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <div className="flex items-center gap-3 mb-2">
        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
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
