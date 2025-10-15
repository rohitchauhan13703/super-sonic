import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Shop.css";

const Shop = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5002/shop")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching characters:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px", color: "yellow" }}>
        Loading...
      </h2>
    );

  return (
    <div className="shop-container">
      {/* Heading with your requested style */}
      <h1
        style={{
          textAlign: "center",
          color: "#dddddd",
          marginTop: "5px",
          marginBottom: "-30px",
        }}
      >
        Products
      </h1>

      <div className="image-grid">
        {characters.map((char) => (
          <div key={char.id} className="image-box">
            <img src={char.image} alt={char.name} className="uploaded-img" />
            <button
              className="go-btn"
              onClick={() => navigate(`/character/${char.id}`)}
            >
              {char.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
