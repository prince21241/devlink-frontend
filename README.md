🔗 DevLink Frontend
A modern developer networking platform built with React and Vite. DevLink connects developers through profiles, posts, projects, and real-time interactions in a sleek, responsive interface.
### Screenshots

![DevLink Icon](src/assets/devlink-art.png)

![DevLink Screenshot 1](src/assets/Screenshot%201%20for%20Devlink.png)

![DevLink Screenshot 2](src/assets/Screenshot%202%20for%20devlink.png)
✨ Features
🔐 Authentication & Security


Secure Login/Register - JWT-based authentication with persistent sessions
Protected Routes - Token-based access control with automatic API integration
Session Management - Auto-login with localStorage token persistence

👤 Developer Profiles & Dashboard

Rich Profiles - Comprehensive developer profiles with skills and projects
Personal Dashboard - Centralized hub for managing your developer presence
Profile Customization - Personalize your developer brand

📝 Social Features

Posts & Feed - Share updates and browse developer content
Real-time Interactions - Engage with the developer community
Connection System - Network with fellow developers

🚀 Project & Skill Management

Project Showcase - Display your best work and contributions
Skill Tracking - Organize and highlight your technical expertise
Portfolio Integration - Seamlessly present your developer journey

🔍 Discovery & Networking

Developer Search - Find developers by skills, location, and interests
Explore Feature - Discover new connections and opportunities
Smart Recommendations - Connect with relevant developers

📱 User Experience

Toast Notifications - Elegant success/error/info messaging system
Responsive Design - Optimized for desktop, tablet, and mobile
Modern UI/UX - Clean, intuitive interface with Tailwind CSS

🛠️ Tech Stack
Frontend Framework

React 19 - Latest React with modern hooks and concurrent features
React Router 7 - Client-side routing with nested routes support
Vite 5 - Lightning-fast development and optimized production builds

Styling & UI

Tailwind CSS 4 - Utility-first CSS framework for rapid UI development
Responsive Design - Mobile-first approach with fluid layouts
Modern Components - Reusable, accessible React components

State Management & API

React Context - AuthContext for global authentication state
Axios - Promise-based HTTP client with interceptors
JWT Integration - Automatic token attachment to API requests

Development Tools

ESLint - Code quality and consistency enforcement
Hot Module Replacement - Instant development feedback
Environment Variables - Secure configuration management

📁 Project Structure
devlink-frontend/
├── src/
│   ├── App.jsx                    # Main app component with routing
│   ├── main.jsx                   # Application entry point & favicon setup
│   ├── context/
│   │   └── AuthContext.jsx        # Authentication context provider
│   ├── api/
│   │   └── axios.js              # Configured axios instance with interceptors
│   ├── components/
│   │   └── Toast/
│   │       └── Toast.jsx         # Toast notification system
│   ├── pages/                    # Route components
│   │   ├── Auth/                 # Login & Register pages
│   │   ├── Home.jsx              # Landing page
│   │   ├── Dashboard.jsx         # User dashboard
│   │   ├── Feed.jsx              # Posts feed
│   │   ├── Profile.jsx           # User profiles
│   │   ├── Projects.jsx          # Project management
│   │   ├── Skills.jsx            # Skills management
│   │   ├── Connections.jsx       # Developer connections
│   │   ├── Notifications.jsx     # User notifications
│   │   ├── Search.jsx            # Developer search
│   │   └── ExploreDevelopers.jsx # Developer discovery
│   └── assets/
│       └── devlink-art.png       # App icon & favicon
├── .env.local                    # Environment variables
├── package.json                  # Dependencies and scripts
├── vite.config.js               # Vite configuration
└── tailwind.config.js           # Tailwind CSS configuration
🚀 Quick Start
Prerequisites

Node.js 18+ and npm/pnpm/yarn
DevLink Backend API running on port 5000 (Backend Repository)

Installation

Clone the repository
bashgit clone https://github.com/prince21241/devlink-frontend.git
cd devlink-frontend

Install dependencies
bashnpm install

Environment setup
Create .env.local in the project root:
envVITE_API_URL=http://localhost:5000

Start development server
bashnpm run dev

Open application
Navigate to http://localhost:5173

📜 Available Scripts
CommandDescriptionnpm run devStart Vite development server with HMRnpm run buildCreate optimized production buildnpm run previewPreview production build locallynpm run lintRun ESLint code quality checks
🔧 Configuration
Authentication Flow
The app uses JWT tokens with automatic request interceptors:
javascript// src/api/axios.js
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers["x-auth-token"] = token;
  return req;
});
Auth Context Usage
javascriptimport { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const { user, loading, logout } = useContext(AuthContext);
Toast Notifications
javascriptimport { useToast } from "../components/Toast/Toast";

const { addToast } = useToast();
addToast("Profile updated successfully!", "success");
// Types: info, success, error, warning
Protected Routes
Routes are automatically protected based on AuthContext state. Unauthenticated users are redirected to /login.
🎨 Styling with Tailwind CSS
DevLink uses Tailwind CSS 4 for utility-first styling:
jsx<div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold mb-4">Developer Profile</h2>
  <p className="text-gray-100">Connect with amazing developers!</p>
</div>
🚀 Deployment
Production Build
bashnpm run build
Deployment Options

Vercel - Automatic deployments with Git integration
Netlify - Continuous deployment with branch previews
AWS S3 - Static hosting with CloudFront CDN
GitHub Pages - Free hosting for open source projects

Environment Variables for Production
Update .env.local with your production API URL:
envVITE_API_URL=https://your-api-domain.com
🔍 Troubleshooting
Common Issues
IssueSolutionBlank API responses/401 errorsVerify VITE_API_URL and check localStorage for valid tokenCORS issuesEnsure backend CORS is configured for frontend originStyles not applyingConfirm Tailwind plugin is active in vite.config.jsBuild failuresCheck all environment variables are set correctly
Debug Tips

Check browser dev tools Network tab for API calls
Verify token format in localStorage
Ensure backend server is running and accessible

🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository
Create a feature branch
bashgit checkout -b feature/amazing-feature

Commit your changes
bashgit commit -m 'Add amazing feature'

Push to the branch
bashgit push origin feature/amazing-feature

Open a Pull Request

Development Guidelines

Follow existing code style and patterns
Add appropriate comments for complex logic
Test your changes thoroughly
Update documentation as needed

📄 License
This project is part of the DevLink application suite.
👤 Developer
prince21241

GitHub: @prince21241
Repository: devlink-frontend

🙏 Acknowledgments

React Team - For the incredible framework and ecosystem
Vite Team - For the blazing-fast development experience
Tailwind CSS - For the utility-first CSS framework
Open Source Community - For continuous inspiration and innovation


<div align="center">
⭐ Found DevLink helpful? Give it a star on GitHub! ⭐
Report Bug · Request Feature · Documentation
</div>