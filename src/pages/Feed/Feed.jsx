import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import PostForm from "./PostForm";
import { buildImageURL } from "../../utils/imageUtils";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPostForm, setShowPostForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchPosts();
    fetchCurrentUser();
  }, [refreshTrigger]);

  const fetchCurrentUser = async () => {
    try {
      // Fetch user info
      const userRes = await API.get("/api/auth/me");
      
      // Fetch user profile for profile picture
      try {
        const profileRes = await API.get("/api/profile/me");
        setCurrentUser({
          ...userRes.data,
          profilePicture: profileRes.data.profilePicture
        });
      } catch (profileErr) {
        // If no profile, just use user data without profile picture
        setCurrentUser(userRes.data);
      }
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/api/posts");
      setPosts(res.data);
    } catch (err) {
      setError("Error fetching posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      await API.post("/api/posts", postData);
      setShowPostForm(false);
      setRefreshTrigger(prev => prev + 1); // Refresh feed
    } catch (err) {
      throw err; // Let the form handle the error
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const res = await API.post(`/api/posts/${postId}/like`);
      // Update the specific post in the state
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? res.data : post
        )
      );
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleCommentPost = async (postId, content) => {
    try {
      const res = await API.post(`/api/posts/${postId}/comment`, { content });
      // Update the specific post in the state
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? res.data : post
        )
      );
    } catch (err) {
      console.error("Error commenting on post:", err);
      throw err;
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await API.delete(`/api/posts/${postId}`);
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      } catch (err) {
        alert("Error deleting post");
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-lg">Loading feed...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={fetchPosts}
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
      {/* Create Post Section */}
      <div className="bg-white rounded-lg shadow p-6">
        {showPostForm ? (
          <PostForm
            onSubmit={handleCreatePost}
            onCancel={() => setShowPostForm(false)}
          />
        ) : (
          <div
            onClick={() => setShowPostForm(true)}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <img
              src={buildImageURL(currentUser?.profilePicture) || "https://i.pravatar.cc/40"}
              alt="Your avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-gray-500 hover:bg-gray-200 transition-colors">
              What's on your mind?
            </div>
          </div>
        )}
      </div>

      {/* Posts Feed */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-gray-500 mb-4">No posts to show</div>
          <p className="text-gray-400 mb-6">
            Be the first to share something with the community!
          </p>
          <button
            onClick={() => setShowPostForm(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Create Your First Post
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              currentUser={currentUser}
              onLike={handleLikePost}
              onComment={handleCommentPost}
              onDelete={handleDeletePost}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PostCard({ post, onLike, onComment, onDelete, currentUser }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  // Get current user ID from token (simple decode)
  const getCurrentUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user.id;
    } catch {
      return null;
    }
  };

  const currentUserId = getCurrentUserId();
  const isLiked = post.likes?.some(like => like.user === currentUserId);
  const isOwner = post.user._id === currentUserId;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setCommentLoading(true);
    try {
      await onComment(post._id, commentText.trim());
      setCommentText("");
    } catch (err) {
      alert("Error posting comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return postDate.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={buildImageURL(post.user.profilePicture) || "https://i.pravatar.cc/40"}
              alt={post.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{formatTimeAgo(post.createdAt)}</span>
                {post.isEdited && <span>• Edited</span>}
                {post.isPinned && <span>📌 Pinned</span>}
              </div>
            </div>
          </div>
          {isOwner && (
            <div className="flex space-x-2">
              <button
                onClick={() => onDelete(post._id)}
                className="text-gray-400 hover:text-red-500 text-sm"
                title="Delete post"
              >
                🗑️
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-4">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
        
        {/* Post Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-blue-600 text-sm hover:underline cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Post Image */}
        {post.image && (
          <div className="mt-4">
            <img
              src={buildImageURL(post.image)}
              alt="Post content"
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Linked Project */}
        {post.project && (
          <div className="mt-4 border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center space-x-3">
              {post.project.projectImage && (
                <img
                  src={buildImageURL(post.project.projectImage)}
                  alt={post.project.title}
                  className="w-12 h-12 rounded object-cover"
                />
              )}
              <div>
                <h4 className="font-semibold text-gray-900">{post.project.title}</h4>
                <p className="text-sm text-gray-600">Project</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="px-6 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onLike(post._id)}
              className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                isLiked ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <span>{isLiked ? "👍" : "👍"}</span>
              <span>Like ({post.likeCount || 0})</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
            >
              <span>💬</span>
              <span>Comment ({post.commentCount || 0})</span>
            </button>
          </div>
          <div className="text-sm text-gray-500">
            {post.visibility === "public" ? "🌍 Public" : "🔒 Private"}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100">
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="p-4 border-b border-gray-100">
            <div className="flex space-x-3">
              <img
                src={buildImageURL(currentUser?.profilePicture) || "https://i.pravatar.cc/32"}
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="2"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={!commentText.trim() || commentLoading}
                    className={`px-4 py-2 text-sm font-medium rounded ${
                      !commentText.trim() || commentLoading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {commentLoading ? "Posting..." : "Post"}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          {post.comments && post.comments.length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              {post.comments.map((comment) => (
                <div key={comment._id} className="p-4 border-b border-gray-50 last:border-b-0">
                  <div className="flex space-x-3">
                    <img
                      src={buildImageURL(comment.user.profilePicture) || "https://i.pravatar.cc/32"}
                      alt={comment.user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg px-3 py-2">
                        <h4 className="font-semibold text-sm text-gray-900">
                          {comment.user.name}
                        </h4>
                        <p className="text-sm text-gray-800 mt-1">{comment.content}</p>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {formatTimeAgo(comment.date)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
