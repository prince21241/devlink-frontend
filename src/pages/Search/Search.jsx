import React, { useState, useEffect, useCallback } from "react";
import API from "../../api/axios";
import { getAvatarWithInitials } from "../../utils/defaultAvatar";
import { SearchIcon, UsersIcon, CommentIcon, HeartIcon, HeartOutlineIcon, CloseIcon, PlusIcon } from "../../components/Icons/Icons";
import { useToast } from "../../components/Toast/Toast";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [searchResults, setSearchResults] = useState({
    users: [],
    posts: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addToast } = useToast();

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setSearchResults({ users: [], posts: [] });
        return;
      }

      setLoading(true);
      setError("");

      try {
        let response;
        if (activeTab === "all") {
          response = await API.get(`/api/search/all?q=${encodeURIComponent(query)}`);
          setSearchResults(response.data);
        } else if (activeTab === "people") {
          response = await API.get(`/api/search/users?q=${encodeURIComponent(query)}`);
          setSearchResults({ users: response.data, posts: [] });
        } else if (activeTab === "posts") {
          response = await API.get(`/api/search/posts?q=${encodeURIComponent(query)}`);
          setSearchResults({ users: [], posts: response.data });
        }
      } catch (err) {
        console.error("Search error:", err);
        setError("Error searching. Please try again.");
        setSearchResults({ users: [], posts: [] });
      } finally {
        setLoading(false);
      }
    }, 300),
    [activeTab]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  useEffect(() => {
    // Re-search when tab changes
    if (searchQuery.trim()) {
      debouncedSearch(searchQuery);
    }
  }, [activeTab]);

  const handleConnect = async (userId) => {
    try {
      await API.post("/api/connections/request", { recipientId: userId });
      
      // Update the user's connection status in results
      setSearchResults(prev => ({
        ...prev,
        users: prev.users.map(user => 
          user._id === userId 
            ? { ...user, connectionStatus: 'sent' }
            : user
        )
      }));
      
      addToast("Connection request sent successfully!", "success");
    } catch (err) {
      console.error("Error sending connection request:", err);
      addToast(err.response?.data?.msg || "Error sending connection request", "error");
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await API.post(`/api/posts/${postId}/like`);
      
      // Update the post in search results
      setSearchResults(prev => ({
        ...prev,
        posts: prev.posts.map(post => 
          post._id === postId 
            ? response.data
            : post
        )
      }));
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults({ users: [], posts: [] });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        {/* Search Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Search</h2>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for people, posts, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <CloseIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Search Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {[
            { key: "all", label: "All", icon: SearchIcon },
            { key: "people", label: "People", icon: UsersIcon },
            { key: "posts", label: "Posts", icon: CommentIcon },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors flex-1 justify-center ${
                activeTab === tab.key
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="text-gray-500">Searching...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <div className="text-red-500 mb-4">{error}</div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && searchQuery && searchResults.users.length === 0 && searchResults.posts.length === 0 && (
          <div className="text-center py-8">
            <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <div className="text-gray-500 mb-2">No results found</div>
            <p className="text-gray-400">
              Try different keywords or check your spelling
            </p>
          </div>
        )}

        {/* Search Results */}
        {!loading && !error && (searchResults.users.length > 0 || searchResults.posts.length > 0) && (
          <div className="space-y-8">
            {/* People Results */}
            {searchResults.users.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <UsersIcon className="w-5 h-5 mr-2" />
                  People ({searchResults.users.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.users.map((user) => (
                    <UserCard
                      key={user._id}
                      user={user}
                      onConnect={handleConnect}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Posts Results */}
            {searchResults.posts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CommentIcon className="w-5 h-5 mr-2" />
                  Posts ({searchResults.posts.length})
                </h3>
                <div className="space-y-4">
                  {searchResults.posts.map((post) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      onLike={handleLike}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Default State */}
        {!searchQuery && (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <div className="text-gray-500 mb-2">Start searching</div>
            <p className="text-gray-400">
              Find people to connect with or discover interesting posts
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// User Card Component
function UserCard({ user, onConnect }) {
  const getConnectionButton = () => {
    switch (user.connectionStatus) {
      case 'connected':
        return (
          <button
            disabled
            className="w-full py-2 px-4 rounded font-medium bg-green-100 text-green-700 cursor-not-allowed"
          >
            Connected
          </button>
        );
      case 'sent':
        return (
          <button
            disabled
            className="w-full py-2 px-4 rounded font-medium bg-yellow-100 text-yellow-700 cursor-not-allowed"
          >
            Request Sent
          </button>
        );
      case 'received':
        return (
          <button
            disabled
            className="w-full py-2 px-4 rounded font-medium bg-blue-100 text-blue-700 cursor-not-allowed"
          >
            Request Received
          </button>
        );
      default:
        return (
          <button
            onClick={() => onConnect(user._id)}
            className="w-full py-2 px-4 rounded font-medium bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center space-x-2"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Connect</span>
          </button>
        );
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="text-center">
        <img
          src={getAvatarWithInitials(user.name, user.profilePicture)}
          alt={user.name}
          className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-gray-100"
        />
        <h3 className="font-semibold text-lg mt-3">{user.name}</h3>
        <p className="text-gray-500 text-sm">{user.email}</p>
        
        {user.location && (
          <p className="text-gray-400 text-sm mt-1">📍 {user.location}</p>
        )}
      </div>

      {user.bio && (
        <p className="text-gray-600 text-sm mt-3 text-center line-clamp-2">
          {user.bio}
        </p>
      )}

      {user.skills && user.skills.length > 0 && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-1 justify-center">
            {user.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
            {user.skills.length > 3 && (
              <span className="text-xs text-gray-500 self-center">
                +{user.skills.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="mt-4">
        {getConnectionButton()}
      </div>
    </div>
  );
}

// Post Card Component
function PostCard({ post, onLike }) {
  const isLiked = post.likes?.some(like => like.user === post.currentUserId);

  return (
    <div className="border rounded-lg bg-white hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start space-x-3">
          <img
            src={getAvatarWithInitials(post.user.name, post.user.profilePicture)}
            alt={post.user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{post.user.name}</h4>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="px-4 pb-3">
          <img
            src={post.image}
            alt="Post content"
            className="w-full rounded-lg object-cover max-h-96"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onLike(post._id)}
              className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                isLiked ? "text-red-600" : "text-gray-500 hover:text-red-600"
              }`}
            >
              {isLiked ? (
                <HeartIcon className="w-5 h-5" />
              ) : (
                <HeartOutlineIcon className="w-5 h-5" />
              )}
              <span>Like ({post.likeCount || 0})</span>
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <CommentIcon className="w-5 h-5" />
              <span>{post.commentCount || 0} comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
