import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import ProjectForm from "./ProjectForm";
import { buildImageURL } from "../../utils/imageUtils";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await API.get("/api/projects/me");
      setProjects(res.data);
    } catch (err) {
      setError("Error fetching projects");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await API.delete(`/api/projects/${projectId}`);
        fetchProjects(); // Refresh the list
      } catch (err) {
        alert("Error deleting project");
        console.error(err);
      }
    }
  };

  const handleFormSubmit = async (projectData) => {
    try {
      if (editingProject) {
        await API.put(`/api/projects/${editingProject._id}`, projectData);
      } else {
        await API.post("/api/projects", projectData);
      }
      setShowForm(false);
      setEditingProject(null);
      fetchProjects(); // Refresh the list
    } catch (err) {
      throw err; // Let the form handle the error
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  if (showForm) {
    return (
      <ProjectForm
        project={editingProject}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-lg">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={fetchProjects}
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
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">My Projects</h2>
            <p className="text-gray-600">Showcase your development projects</p>
          </div>
          <button
            onClick={handleAddProject}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
          >
            <span>➕</span>
            Add Project
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-gray-500 mb-4">No projects yet</div>
          <p className="text-gray-400 mb-6">
            Start showcasing your work by adding your first project!
          </p>
          <button
            onClick={handleAddProject}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
      {/* Project Image */}
      {project.projectImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={buildImageURL(project.projectImage)}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-1">
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
              </span>
              {project.featured && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  ⭐ Featured
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 ml-2">
            <button
              onClick={() => onEdit(project)}
              className="text-blue-500 hover:text-blue-700 text-sm"
              title="Edit"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(project._id)}
              className="text-red-500 hover:text-red-700 text-sm"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-xs text-gray-500 self-center">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Dates */}
        {(project.startDate || project.endDate) && (
          <div className="text-xs text-gray-500 mb-4">
            {project.startDate && (
              <span>Started: {formatDate(project.startDate)}</span>
            )}
            {project.startDate && project.endDate && <span> • </span>}
            {project.endDate && (
              <span>Completed: {formatDate(project.endDate)}</span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3 pt-3 border-t border-gray-100">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              🔗 Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              🐙 GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
