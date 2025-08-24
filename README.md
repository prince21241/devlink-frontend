## DevLink Frontend (React + Vite)

DevLink is a developer networking app. This frontend is a React (Vite) single‑page application that connects to the DevLink backend API to provide authentication, profiles, posts, projects, skills, connections, notifications, and search.

### Key Features
- **Authentication**: Login/Register pages, persisted session via token stored in `localStorage` and auto-loaded by `AuthContext`.
- **Protected experience**: App state managed by `AuthContext`; token is automatically attached to API requests via a request interceptor using header `x-auth-token`.
- **Profiles & Dashboard**: Create, edit, and view developer profiles with a personal dashboard.
- **Posts & Feed**: Compose posts and browse a feed (`Feed.jsx`, `PostForm.jsx`).
- **Projects & Skills**: Add and manage projects and skills.
- **Connections**: Connect with other developers.
- **Notifications**: Basic notifications page.
- **Search & Explore**: Discover developers (`Search.jsx`, `ExploreDevelopers.jsx`).
- **Toast System**: Global toasts (`ToastProvider`) for success/error/info messages.
- **Styling**: Tailwind CSS v4 for utility-first styling.

### Tech Stack
- **React** 19 (SPA)
- **React Router** 7
- **Vite** 5
- **Tailwind CSS** 4
- **Axios** for HTTP

### Directory Structure (selected)
- `src/App.jsx`: Routes and app layout with `ToastProvider` and `Footer`.
- `src/main.jsx`: App bootstrap, mounts `AuthProvider`, sets favicon.
- `src/context/AuthContext.jsx`: Loads current user, provides `user`, `loading`, and `logout`.
- `src/api/axios.js`: Axios instance with `baseURL` from `VITE_API_URL` and token interceptor.
- `src/components/Toast/Toast.jsx`: Toast context/provider and hook.
- `src/pages/*`: Route screens such as `Auth`, `Home`, `Dashboard`, `Feed`, `Profile`, `Projects`, `Skills`, `Connections`, `Notifications`, `Search`, `Explore`.
- `src/assets/devlink-art.png`: App icon used as favicon.

### Prerequisites
- Node.js 18+ and npm (or pnpm/yarn)
- Running backend API (defaults to port 5000). See backend `server.js` for routes under `/api/*`.

### Environment Variables
Create a `.env.local` in `devlink-frontend/` with:

```bash
VITE_API_URL=http://localhost:5000
```

This value is used by `src/api/axios.js`:

```js
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers["x-auth-token"] = token;
  return req;
});
```

### Install & Run
```bash
cd devlink-frontend
npm install
npm run dev
```

- Dev server: `http://localhost:5173` (Vite default)
- Ensure the backend is running (default `http://localhost:5000`).

### Available Scripts
- `npm run dev`: Start Vite dev server
- `npm run build`: Production build
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint

### Routing
Routes are defined in `src/App.jsx` using React Router. Example:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>
```

To add protected routes, gate components based on `AuthContext`'s `user`/`loading` state (e.g., redirect unauthenticated users to `/login`).

### Auth Context Usage
`AuthProvider` auto-loads the current user when a token exists, and exposes `user`, `setUser`, `loading`, and `logout`.

```jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const { user, loading, logout } = useContext(AuthContext);
```

On successful login/register, persist the token in `localStorage` and optionally call `setUser`.

### Toasts
Wrap the app with `ToastProvider` (already done in `App.jsx`) and use the hook:

```jsx
import { useToast } from "../components/Toast/Toast";

const { addToast } = useToast();
addToast("Saved successfully", "success");
```

Types: `info` (default), `success`, `error`, `warning`.

### Styling
Tailwind v4 is configured via the Vite plugin. Use utility classes directly in JSX.

### Favicon
`src/main.jsx` sets the favicon dynamically from `src/assets/devlink-art.png`.

### Build & Deploy
```bash
npm run build
```
Outputs static assets to `dist/`. Serve the `dist/` folder with any static host. Ensure `VITE_API_URL` points to your deployed backend API before building.

### Troubleshooting
- Blank API responses or 401s: confirm `VITE_API_URL` and that a valid token exists in `localStorage`.
- CORS issues: ensure backend CORS is enabled for the frontend origin.
- Styles not applying: verify Tailwind plugin is active in `vite.config.js` and classes are present in JSX.

### License
This project is provided as part of the DevLink application.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
