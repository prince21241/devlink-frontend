// Get the base URL for the API
const getBaseURL = () => {
  return import.meta.env.VITE_API_URL || 'http://localhost:5000';
};

// Build full image URL for uploaded images
export const buildImageURL = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL (http/https), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a relative path starting with /uploads, build full URL
  if (imagePath.startsWith('/uploads/')) {
    return `${getBaseURL()}${imagePath}`;
  }
  
  // If it's just a filename or relative path, assume it's in uploads
  return `${getBaseURL()}/uploads/projects/${imagePath}`;
};
