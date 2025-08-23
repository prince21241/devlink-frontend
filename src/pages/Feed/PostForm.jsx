import React, { useState, useEffect } from "react";
import API from "../../api/axios";

export default function PostForm({ onSubmit, onCancel, post }) {
  const [formData, setFormData] = useState({
    content: "",
    postType: "text",
    visibility: "public",
    tags: "",
    image: "",
  });
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
    
    if (post) {
      setFormData({
        content: post.content || "",
        postType: post.postType || "text",
        visibility: post.visibility || "public",
        tags: post.tags ? post.tags.join(", ") : "",
        image: post.image || "",
      });
      
      if (post.image) {
        setImagePreview(post.image);
      }
      
      if (post.project) {
        setSelectedProject(post.project._id);
      }
    }
  }, [post]);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/api/projects/me");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      setError('');
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const uploadImage = async () => {
    if (!selectedFile) return null;
    
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('projectImage', selectedFile);
      
      const response = await API.post('/api/upload/project-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data.imageUrl;
    } catch (err) {
      throw new Error(err.response?.data?.msg || 'Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!formData.content.trim()) {
      setError("Please write something to share");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = formData.image;
      
      // Upload new image if selected
      if (selectedFile) {
        imageUrl = await uploadImage();
      }

      const postData = {
        content: formData.content.trim(),
        postType: formData.postType,
        visibility: formData.visibility,
      };

      // Add optional fields
      if (imageUrl) postData.image = imageUrl;
      if (selectedProject) postData.project = selectedProject;
      if (formData.tags.trim()) {
        postData.tags = formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag);
      }

      await onSubmit(postData);
    } catch (err) {
      setError(err.message || err.response?.data?.msg || "Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Content */}
        <div>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="What's on your mind? Share your thoughts, achievements, or ask for help..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="4"
            maxLength="2000"
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {formData.content.length}/2000 characters
          </div>
        </div>

        {/* Post Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Post Type
            </label>
            <select
              name="postType"
              value={formData.postType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="text">💬 Text</option>
              <option value="image">🖼️ Image</option>
              <option value="project">🚀 Project</option>
              <option value="achievement">🏆 Achievement</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Visibility
            </label>
            <select
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="public">🌍 Public</option>
              <option value="connections">👥 Connections Only</option>
              <option value="private">🔒 Private</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="react, javascript, career"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Image Upload */}
        {(formData.postType === "image" || formData.postType === "achievement") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-4">
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-48 h-32 object-cover rounded-md border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}
            
            {/* File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-sm text-gray-500 mt-1">
              Upload an image to share (Max 5MB, JPG/PNG/GIF)
            </p>
            
            {uploading && (
              <p className="text-sm text-blue-600 mt-2">Uploading image...</p>
            )}
          </div>
        )}

        {/* Project Selection */}
        {formData.postType === "project" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Project
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a project...</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.title}
                </option>
              ))}
            </select>
            {projects.length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                No projects found. Create a project first to share it.
              </p>
            )}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            💡 Tip: Use hashtags to help others discover your post
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className={`px-6 py-2 rounded-md text-white font-medium ${
                loading || uploading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              }`}
            >
              {uploading ? "Uploading..." : loading ? "Posting..." : post ? "Update Post" : "Share Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
