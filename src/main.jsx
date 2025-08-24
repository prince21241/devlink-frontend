import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

// Import favicon from src/assets
import favicon from "./assets/devlink-art.png";

// Dynamically set the favicon
const link = document.createElement("link");
link.rel = "icon";
link.type = "image/png";
link.href = favicon;
document.head.appendChild(link);

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
