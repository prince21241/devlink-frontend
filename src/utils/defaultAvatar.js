/**
 * Utility for handling default user avatars
 * Returns a default avatar URL when no profile picture is provided
 */

// Using a simple, clean default avatar similar to Instagram's approach
// This is a generic user icon from a reliable CDN
const DEFAULT_AVATAR_URL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzciIHI9IjE4IiBmaWxsPSIjOUM5Qzk5Ii8+CjxwYXRoIGQ9Ik0yMCA4NUMyMCA3MS43NDUyIDMwLjc0NTIgNjEgNDQgNjFINTZDNjkuMjU0OCA2MSA4MCA3MS43NDUyIDgwIDg1VjEwMEgyMFY4NVoiIGZpbGw9IiM5QzlDOTkiLz4KPC9zdmc+";

/**
 * Get the appropriate avatar URL
 * @param {string} profilePicture - User's profile picture URL
 * @returns {string} - Profile picture URL or default avatar
 */
export const getAvatarUrl = (profilePicture) => {
  if (profilePicture && profilePicture.trim() !== '') {
    return profilePicture;
  }
  return DEFAULT_AVATAR_URL;
};

/**
 * Alternative default avatar using a solid color background with initials
 * @param {string} name - User's name
 * @param {string} profilePicture - User's profile picture URL
 * @returns {string} - Profile picture URL or generated avatar with initials
 */
export const getAvatarWithInitials = (name = '', profilePicture) => {
  if (profilePicture && profilePicture.trim() !== '') {
    return profilePicture;
  }
  
  // Generate initials
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  // Generate a consistent color based on the name
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];
  
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const backgroundColor = colors[colorIndex];
  
  // Create SVG with initials
  const svg = `
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="${backgroundColor}"/>
      <text x="50" y="50" font-family="Arial, sans-serif" font-size="36" font-weight="bold" 
            text-anchor="middle" dominant-baseline="middle" fill="white">
        ${initials}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export default getAvatarUrl;
