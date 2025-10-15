import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Image.css"; // styling 

const Image = () => {
  const { id } = useParams();

  //  text
  const messages = ["shop now", "Shop now", "Shop now", "shop now"];
  const text = messages[id - 1] || "Not Found";

  // ✅ Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // ✅ Simple login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setLoggedIn(true);
    } else {
      alert("Please enter email and password!");
    }
  };

  return (
    <div className="image-page">
      <h1 className="page-heading">{text}</h1>

      {/* ✅ sirf Hello aur Hi pages me login dikhana */}
      {(id === "1" || id === "2") && !loggedIn && (
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      )}

      {loggedIn && <p className="success-msg">✅ You are logged in!</p>}
    </div>
  );
};

export default Image;
