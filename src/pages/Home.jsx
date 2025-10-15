import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import videoFile from "../Movie/4.mp4"; //  path (Movie with capital M)

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      {/* ✅ Background Video */}
      <video autoPlay loop muted playsInline className="bg-video">
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* ✅ Overlay content */}
      <div className="content">
        <h1>Welcome to Super Sonic Store </h1>
        <button onClick={handleLogin} className="login-btn">
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Home;
