import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import SkillForm from "./SkillForm";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  useEffect(() => {
    fetchSkills();
    fetchCategories();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await API.get("/api/skills/me");
      setSkills(res.data);
    } catch (err) {
      setError("Error fetching skills");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/api/skills/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleAddSkill = () => {
    setEditingSkill(null);
    setShowForm(true);
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setShowForm(true);
  };

  const handleDeleteSkill = async (skillId) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await API.delete(`/api/skills/${skillId}`);
        fetchSkills(); // Refresh the list
        fetchCategories(); // Refresh categories
      } catch (err) {
        alert("Error deleting skill");
        console.error(err);
      }
    }
  };

  const handleFormSubmit = async (skillData) => {
    try {
      if (editingSkill) {
        await API.put(`/api/skills/${editingSkill._id}`, skillData);
      } else {
        await API.post("/api/skills", skillData);
      }
      setShowForm(false);
      setEditingSkill(null);
      fetchSkills(); // Refresh the list
      fetchCategories(); // Refresh categories
    } catch (err) {
      throw err; // Let the form handle the error
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingSkill(null);
  };

  const filteredSkills = selectedCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const skillsByCategory = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  if (showForm) {
    return (
      <SkillForm
        skill={editingSkill}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-lg">Loading skills...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={fetchSkills}
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">My Skills</h2>
            <p className="text-gray-600">Showcase your technical expertise and proficiency levels</p>
          </div>
          <button
            onClick={handleAddSkill}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
          >
            <span>➕</span>
            Add Skill
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All ({skills.length})
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category._id} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Skills Display */}
      {skills.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-gray-500 mb-4">No skills added yet</div>
          <p className="text-gray-400 mb-6">
            Start building your skills profile to showcase your expertise!
          </p>
          <button
            onClick={handleAddSkill}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Add Your First Skill
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  {getCategoryIcon(category)}
                  {category}
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {categorySkills.length}
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill) => (
                    <SkillCard
                      key={skill._id}
                      skill={skill}
                      onEdit={handleEditSkill}
                      onDelete={handleDeleteSkill}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SkillCard({ skill, onEdit, onDelete }) {
  const getProficiencyColor = (proficiency) => {
    switch (proficiency) {
      case "Beginner":
        return "bg-red-100 text-red-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-blue-100 text-blue-800";
      case "Expert":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProficiencyLevel = (proficiency) => {
    switch (proficiency) {
      case "Beginner":
        return 25;
      case "Intermediate":
        return 50;
      case "Advanced":
        return 75;
      case "Expert":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900">{skill.name}</h4>
            {skill.featured && (
              <span className="text-yellow-500 text-sm" title="Featured Skill">
                ⭐
              </span>
            )}
            {skill.isEndorsed && (
              <span className="text-blue-500 text-sm" title="Endorsed">
                👍
              </span>
            )}
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProficiencyColor(skill.proficiency)}`}>
            {skill.proficiency}
          </span>
        </div>
        <div className="flex gap-1 ml-2">
          <button
            onClick={() => onEdit(skill)}
            className="text-blue-500 hover:text-blue-700 text-sm"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(skill._id)}
            className="text-red-500 hover:text-red-700 text-sm"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Proficiency Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Proficiency</span>
          <span>{skill.proficiency}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${getProficiencyLevel(skill.proficiency)}%` }}
          ></div>
        </div>
      </div>

      {/* Years of Experience */}
      {skill.yearsOfExperience > 0 && (
        <div className="text-xs text-gray-500 mb-2">
          {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} experience
        </div>
      )}

      {/* Description */}
      {skill.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {skill.description}
        </p>
      )}

      {/* Endorsements */}
      {skill.endorsements && skill.endorsements.length > 0 && (
        <div className="text-xs text-gray-500">
          {skill.endorsements.length} endorsement{skill.endorsements.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Certifications */}
      {skill.certifications && skill.certifications.length > 0 && (
        <div className="mt-2">
          <div className="text-xs text-gray-500 mb-1">Certifications:</div>
          {skill.certifications.slice(0, 2).map((cert, index) => (
            <div key={index} className="text-xs text-blue-600">
              {cert.name} - {cert.issuer}
            </div>
          ))}
          {skill.certifications.length > 2 && (
            <div className="text-xs text-gray-400">
              +{skill.certifications.length - 2} more
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function getCategoryIcon(category) {
  const icons = {
    Frontend: "🎨",
    Backend: "⚙️",
    Database: "🗄️",
    Mobile: "📱",
    DevOps: "🚀",
    Cloud: "☁️",
    Testing: "🧪",
    Design: "🎯",
    Languages: "💻",
    Frameworks: "🏗️",
    Tools: "🔧",
    Other: "📚",
  };
  return icons[category] || "📚";
}
