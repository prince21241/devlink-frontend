import React, { useState, useEffect } from "react";
import API from "../../api/axios";

export default function ProjectForm({ project, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    projectImage: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    status: "completed",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        technologies: Array.isArray(project.technologies) 
          ? project.technologies.join(", ") 
          : project.technologies || "",
        projectImage: project.projectImage || "",
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
        featured: project.featured || false,
        status: project.status || "completed",
        startDate: project.startDate ? project.startDate.split('T')[0] : "",
        endDate: project.endDate ? project.endDate.split('T')[0] : "",
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.technologies.trim()) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(",").map(tech => tech.trim()).filter(tech => tech),
      };

      await onSubmit(projectData);
    } catch (err) {
      setError(err.message || err.response?.data?.msg || "Error saving project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {project ? "Edit Project" : "Add New Project"}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., E-commerce Website"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your project, its features, and what makes it special..."
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-2">
                Technologies Used *
              </label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., React, Node.js, MongoDB, Tailwind CSS (comma separated)"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate technologies with commas
              </p>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Featured Project ⭐
              </label>
            </div>
          </div>
        </div>

        {/* Media & Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Media & Links</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="projectImage" className="block text-sm font-medium text-gray-700 mb-2">
                Project Image URL
              </label>
              <input
                type="url"
                id="projectImage"
                name="projectImage"
                value={formData.projectImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/project-image.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter the URL of your project screenshot or preview image
              </p>
            </div>

            <div>
              <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Live Website URL
              </label>
              <input
                type="url"
                id="liveUrl"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://your-project.com"
              />
            </div>

            <div>
              <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Repository URL
              </label>
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/username/repository"
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-md text-white font-medium ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            }`}
          >
            {loading ? "Saving..." : project ? "Update Project" : "Add Project"}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
