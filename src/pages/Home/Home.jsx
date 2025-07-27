import { useNavigate } from "react-router-dom";
import devlinkArt from "../../assets/devlink-art.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-left">
        <h1>
          Welcome to <span className="highlight">DevLink</span>
        </h1>
        <p>Connect, share, and grow with fellow developers.</p>
        <div className="btn-group">
          <button onClick={() => navigate("/login")}>Login</button>
          <button
            onClick={() => navigate("/register")}
            className="register-btn"
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="home-right">
        <img src={devlinkArt} alt="DevLink" className="hero-image" />
      </div>
    </div>
  );
}
