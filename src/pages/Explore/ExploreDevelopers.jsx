import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { getAvatarWithInitials } from "../../utils/defaultAvatar";
import { RefreshIcon } from "../../components/Icons/Icons";
import { useToast } from "../../components/Toast/Toast";

export default function ExploreDevelopers() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sendingRequests, setSendingRequests] = useState({});
  const { addToast } = useToast();

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const res = await API.get("/api/connections/suggestions");
      setSuggestions(res.data);
    } catch (err) {
      setError("Error fetching developer suggestions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async (userId) => {
    setSendingRequests(prev => ({ ...prev, [userId]: true }));
    
    try {
      await API.post("/api/connections/request", { recipientId: userId });
      
      // Remove the user from suggestions since request was sent
      setSuggestions(prev => prev.filter(user => user._id !== userId));
      
      addToast("Connection request sent successfully!", "success");
    } catch (err) {
      const errorMsg = err.response?.data?.msg || "Error sending connection request";
      addToast(errorMsg, "error");
      console.error(err);
    } finally {
      setSendingRequests(prev => ({ ...prev, [userId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-lg">Finding developers for you...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={fetchSuggestions}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Explore Developers</h2>
          <button
            onClick={fetchSuggestions}
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200 text-sm flex items-center space-x-2 transition-colors"
          >
            <RefreshIcon className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        {suggestions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">No more suggestions</div>
            <p className="text-gray-400">
              You've seen all available developers. Check back later for new members!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((user) => (
              <DeveloperCard
                key={user._id}
                user={user}
                onSendRequest={handleSendRequest}
                isSending={sendingRequests[user._id] || false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DeveloperCard({ user, onSendRequest, isSending }) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
      <div className="text-center">
        <img
          src={getAvatarWithInitials(user.name, user.profilePicture)}
          alt={user.name}
          className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-blue-100"
        />
        <h3 className="font-semibold text-lg mt-3">{user.name}</h3>
        <p className="text-gray-500 text-sm">{user.email}</p>
        
        {user.location && (
          <p className="text-gray-400 text-sm mt-1">📍 {user.location}</p>
        )}
      </div>

      {user.bio && (
        <p className="text-gray-600 text-sm mt-4 text-center line-clamp-3">
          {user.bio}
        </p>
      )}

      {user.skills && user.skills.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {user.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
            {user.skills.length > 4 && (
              <span className="text-xs text-gray-500 self-center">
                +{user.skills.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => onSendRequest(user._id)}
          disabled={isSending}
          className={`w-full py-2 px-4 rounded font-medium ${
            isSending
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isSending ? "Sending..." : "Connect"}
        </button>
      </div>
    </div>
  );
}

