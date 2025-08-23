import React, { useState, useEffect } from "react";

export default function SkillForm({ skill, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    proficiency: "Intermediate",
    yearsOfExperience: 0,
    description: "",
    featured: false,
    certifications: [],
  });
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Frontend",
    "Backend", 
    "Database",
    "Mobile",
    "DevOps",
    "Cloud",
    "Testing",
    "Design",
    "Languages",
    "Frameworks",
    "Tools",
    "Other"
  ];

  const proficiencyLevels = [
    "Beginner",
    "Intermediate", 
    "Advanced",
    "Expert"
  ];

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name || "",
        category: skill.category || "Frontend",
        proficiency: skill.proficiency || "Intermediate",
        yearsOfExperience: skill.yearsOfExperience || 0,
        description: skill.description || "",
        featured: skill.featured || false,
        certifications: skill.certifications || [],
      });
    }
  }, [skill]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleCertificationChange = (e) => {
    const { name, value } = e.target;
    setNewCertification(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCertification = () => {
    if (!newCertification.name.trim() || !newCertification.issuer.trim()) {
      setError("Please provide certification name and issuer");
      return;
    }

    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { ...newCertification }]
    }));

    setNewCertification({
      name: "",
      issuer: "",
      date: "",
      url: "",
    });
    setError("");
  };

  const handleRemoveCertification = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!formData.name.trim() || !formData.category || !formData.proficiency) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.response?.data?.msg || "Error saving skill");
    } finally {
      setLoading(false);
    }
  };

  const getProficiencyDescription = (proficiency) => {
    switch (proficiency) {
      case "Beginner":
        return "Just started learning, basic understanding";
      case "Intermediate":
        return "Comfortable using, some experience";
      case "Advanced":
        return "Highly proficient, extensive experience";
      case "Expert":
        return "Deep expertise, can teach others";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {skill ? "Edit Skill" : "Add New Skill"}
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Skill Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., React, Python, AWS, etc."
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="proficiency" className="block text-sm font-medium text-gray-700 mb-2">
                Proficiency Level *
              </label>
              <select
                id="proficiency"
                name="proficiency"
                value={formData.proficiency}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {proficiencyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                {getProficiencyDescription(formData.proficiency)}
              </p>
            </div>

            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                min="0"
                max="50"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your experience with this skill, notable projects, or achievements..."
              />
            </div>

            <div className="md:col-span-2 flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Featured Skill ⭐ (Show prominently on profile)
              </label>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Certifications</h3>
          
          {/* Existing Certifications */}
          {formData.certifications.length > 0 && (
            <div className="mb-4 space-y-2">
              {formData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-sm text-gray-600">{cert.issuer}</div>
                    {cert.date && (
                      <div className="text-xs text-gray-500">
                        {new Date(cert.date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCertification(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Certification */}
          <div className="border rounded-md p-4 space-y-3">
            <h4 className="font-medium">Add Certification</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  name="name"
                  value={newCertification.name}
                  onChange={handleCertificationChange}
                  placeholder="Certification Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="issuer"
                  value={newCertification.issuer}
                  onChange={handleCertificationChange}
                  placeholder="Issuing Organization"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="date"
                  name="date"
                  value={newCertification.date}
                  onChange={handleCertificationChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="url"
                  name="url"
                  value={newCertification.url}
                  onChange={handleCertificationChange}
                  placeholder="Certificate URL (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddCertification}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm"
            >
              Add Certification
            </button>
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
            {loading ? "Saving..." : skill ? "Update Skill" : "Add Skill"}
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
