import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { getAvatarWithInitials } from "../../utils/defaultAvatar";

export default function Connections() {
  const [activeTab, setActiveTab] = useState("connections");
  const [connections, setConnections] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [connectionsRes, receivedRes, sentRes] = await Promise.all([
        API.get("/api/connections"),
        API.get("/api/connections/requests/received"),
        API.get("/api/connections/requests/sent")
      ]);

      setConnections(connectionsRes.data);
      setReceivedRequests(receivedRes.data);
      setSentRequests(sentRes.data);
    } catch (err) {
      setError("Error fetching connection data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (connectionId) => {
    try {
      await API.put(`/api/connections/${connectionId}/accept`);
      // Refresh data
      fetchAllData();
    } catch (err) {
      alert("Error accepting connection request");
      console.error(err);
    }
  };

  const handleRejectRequest = async (connectionId) => {
    try {
      await API.put(`/api/connections/${connectionId}/reject`);
      // Refresh data
      fetchAllData();
    } catch (err) {
      alert("Error rejecting connection request");
      console.error(err);
    }
  };

  const handleRemoveConnection = async (connectionId) => {
    if (window.confirm("Are you sure you want to remove this connection?")) {
      try {
        await API.delete(`/api/connections/${connectionId}`);
        // Refresh data
        fetchAllData();
      } catch (err) {
        alert("Error removing connection");
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-lg">Loading connections...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={fetchAllData}
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
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { key: "connections", label: `My Connections (${connections.length})` },
              { key: "received", label: `Received (${receivedRequests.length})` },
              { key: "sent", label: `Sent (${sentRequests.length})` }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "connections" && (
            <ConnectionsList 
              connections={connections} 
              onRemove={handleRemoveConnection} 
            />
          )}
          {activeTab === "received" && (
            <ReceivedRequestsList 
              requests={receivedRequests}
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
            />
          )}
          {activeTab === "sent" && (
            <SentRequestsList requests={sentRequests} />
          )}
        </div>
      </div>
    </div>
  );
}

// Component for displaying connections list
function ConnectionsList({ connections, onRemove }) {
  if (connections.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-4">No connections yet</div>
        <p className="text-gray-400">Start connecting with other developers!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {connections.map((connection) => (
        <div key={connection._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <img
              src={getAvatarWithInitials(connection.user.name, connection.user.profilePicture)}
              alt={connection.user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {connection.user.name}
              </h3>
              <p className="text-sm text-gray-500 truncate">{connection.user.email}</p>
              {connection.user.location && (
                <p className="text-xs text-gray-400">📍 {connection.user.location}</p>
              )}
            </div>
          </div>
          
          {connection.user.bio && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {connection.user.bio}
            </p>
          )}

          {connection.user.skills && connection.user.skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {connection.user.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
              {connection.user.skills.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{connection.user.skills.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <span className="text-xs text-gray-400">
              Connected {new Date(connection.connectedAt).toLocaleDateString()}
            </span>
            <button
              onClick={() => onRemove(connection.connectionId)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Component for displaying received requests
function ReceivedRequestsList({ requests, onAccept, onReject }) {
  if (requests.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-4">No pending requests</div>
        <p className="text-gray-400">You're all caught up!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div key={request._id} className="border rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={getAvatarWithInitials(request.requester.name, request.requester.profilePicture)}
              alt={request.requester.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{request.requester.name}</h3>
              <p className="text-sm text-gray-500">{request.requester.email}</p>
              <p className="text-xs text-gray-400">
                Requested {new Date(request.requestedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onAccept(request._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
            >
              Accept
            </button>
            <button
              onClick={() => onReject(request._id)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-400"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Component for displaying sent requests
function SentRequestsList({ requests }) {
  if (requests.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 mb-4">No pending sent requests</div>
        <p className="text-gray-400">Your sent requests will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div key={request._id} className="border rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={getAvatarWithInitials(request.recipient.name, request.recipient.profilePicture)}
              alt={request.recipient.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{request.recipient.name}</h3>
              <p className="text-sm text-gray-500">{request.recipient.email}</p>
              <p className="text-xs text-gray-400">
                Sent {new Date(request.requestedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-sm text-yellow-600 font-medium">
            Pending
          </div>
        </div>
      ))}
    </div>
  );
}
