import React from 'react';

// Bell/Notification Icon
export const BellIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </svg>
);

// Search Icon
export const SearchIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

// Heart/Like Icon (filled)
export const HeartIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

// Heart/Like Icon (outline)
export const HeartOutlineIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill="none" stroke={fill} strokeWidth="2" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

// Comment Icon
export const CommentIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
  </svg>
);

// User/People Icon for connections
export const UsersIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99l-2.54 3.38c-.14.18-.35.29-.58.29s-.44-.11-.58-.29L8.75 9.99C8.28 9.37 7.54 9 6.74 9H5.46c-.75 0-1.42.38-1.8 1.01L1.12 16H3.5v6h2v-4.5h1v4.5h2v-6L12 8l3.5 8v6h2z"/>
  </svg>
);

// Check/Success Icon
export const CheckIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

// Plus Icon for connection requests
export const PlusIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

// Close/X Icon
export const CloseIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

// Share Icon
export const ShareIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
  </svg>
);

// Bookmark Icon
export const BookmarkIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
  </svg>
);

// More Options (3 dots) Icon
export const MoreIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

// Refresh Icon
export const RefreshIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
  </svg>
);

// Pin Icon
export const PinIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
  </svg>
);

// Edit Icon
export const EditIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
  </svg>
);

// Delete/Trash Icon
export const DeleteIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
);

// Globe/Network Icon
export const GlobeNetworkIcon = ({ className = "w-8 h-8", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 19.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

// Lightbulb/Discovery Icon
export const LightbulbIcon = ({ className = "w-8 h-8", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
  </svg>
);

// Book/Knowledge Icon
export const BookIcon = ({ className = "w-8 h-8", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
  </svg>
);

// Rocket/Launch Icon
export const RocketIcon = ({ className = "w-8 h-8", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M12 2.5s4.5 2.04 4.5 10.5c0 2.49-1.04 5.57-1.6 7H9.1c-.56-1.43-1.6-4.51-1.6-7C7.5 4.54 12 2.5 12 2.5zM8.5 15c0 1.11.89 2 2 2s2-.89 2-2-.89-2-2-2-2 .89-2 2zm7-7c-.83 0-1.5-.67-1.5-1.5S14.67 5 15.5 5 17 5.67 17 6.5 16.33 8 15.5 8z"/>
  </svg>
);

// Code/Development Icon
export const CodeIcon = ({ className = "w-8 h-8", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
  </svg>
);

// Star Icon
export const StarIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// Information/Info Icon
export const InformationCircleIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
  </svg>
);

// Mail/Envelope Icon
export const MailIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

// User Profile Icon (single)
export const UserIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
  </svg>
);

// Lock/Security Icon
export const LockIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M12 17a2 2 0 1 0 .001-3.999A2 2 0 0 0 12 17zm6-6h-1V9a5 5 0 0 0-10 0v2H6c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm-3 0H9V9a3 3 0 0 1 6 0v2z"/>
  </svg>
);

// Eye (show password)
export const EyeIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 .001-9.999A5 5 0 0 1 12 17zm0-8a3 3 0 1 0 .001 5.999A3 3 0 0 0 12 9z"/>
  </svg>
);

// Eye Off (hide password)
export const EyeOffIcon = ({ className = "w-5 h-5", fill = "currentColor" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24">
    <path d="M3 4.27L4.28 3 21 19.72 19.73 21l-3.2-3.2C14.87 18.58 13.47 19 12 19 5 19 1 12 1 12c1.09-1.82 2.62-3.7 4.62-5.06l-2.62-2.67zM12 7c1.57 0 2.98.46 4.2 1.2l-1.48 1.48A3 3 0 0 0 9.68 14.8L8.2 16.28C7.46 15.06 7 13.65 7 12a5 5 0 0 1 5-5zm0 10c1.21 0 2.34-.27 3.38-.73l-1.56-1.56a5 5 0 0 1-6.52-6.52L5.19 6.48C3.82 7.39 2.62 8.6 1.7 9.84 1.7 9.84 5 17 12 17z"/>
  </svg>
);

export default {
  BellIcon,
  SearchIcon,
  HeartIcon,
  HeartOutlineIcon,
  CommentIcon,
  UsersIcon,
  CheckIcon,
  PlusIcon,
  CloseIcon,
  ShareIcon,
  BookmarkIcon,
  MoreIcon,
  RefreshIcon,
  PinIcon,
  EditIcon,
  DeleteIcon,
  GlobeNetworkIcon,
  LightbulbIcon,
  BookIcon,
  RocketIcon,
  CodeIcon,
  StarIcon,
  InformationCircleIcon,
  MailIcon,
  UserIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon
};
