import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import videoFile from "../Movie/4.mp4";
import logoImg from "../img/sonic png/1 (1).png";

const Login = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ Email & Password Validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/.test(password);

  // ✅ Check if user already logged in
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setMsg("❌ Please enter a valid email (e.g. user@example.com)");
      return;
    }

    if (!isValidPassword(password)) {
      setMsg("❌ Password must have at least 6 chars, 1 uppercase, 1 lowercase & 1 number.");
      return;
    }

    if (isSignup) {
      // ✅ Signup logic
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      setMsg("✅ Signup successful! Please login now.");
      setIsSignup(false);
      setEmail("");
      setPassword("");
    } else {
      // ✅ Login logic
      const storedEmail = localStorage.getItem("userEmail");
      const storedPassword = localStorage.getItem("userPassword");

      if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("loggedInUser", email);
        setLoggedIn(true);
        alert("✅ Login successful!");
        navigate("/shop");
      } else {
        setMsg("❌ Invalid email or password!");
      }
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedIn(false);
    alert("👋 You have been logged out.");
    navigate("/login");
  };

  return (
    <div className="login-container">
      <video autoPlay loop muted playsInline className="bg-video">
        <source src={videoFile} type="video/mp4" />
      </video>

      <div className="form-box">
        <div className="logo center-logo">
          <img src={logoImg} alt="Logo" />
        </div>

        {/* ✅ If logged in, show Logout & status */}
        {loggedIn ? (
          <>
            <h2>Welcome Back!</h2>
            <p>You are logged in as <b>{localStorage.getItem("loggedInUser")}</b></p>
            <button className="login-btn" onClick={() => navigate("/shop")}>
              Go to Shop 🛒
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <h2>{isSignup ? "Create Account" : "Login to Continue"}</h2>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="login-btn">
                {isSignup ? "Sign Up" : "Login"}
              </button>
            </form>

            {msg && <p className="msg">{msg}</p>}

            <div className="switch-text">
              {isSignup
                ? "Already have an account?"
                : "Don't have an account?"}
              <button
                className="switch-btn"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setMsg("");
                }}
              >
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
