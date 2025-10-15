import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Character.css";

const Character = () => {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImg, setMainImg] = useState("");
  const [qty, setQty] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5002/shop")
      .then((res) => res.json())
      .then((data) => {
        const shopArray = Array.isArray(data) ? data : data.shop || [];
        const found = shopArray.find(
          (item) => String(item.id) === String(characterId)
        );

        if (!found) throw new Error("Character not found");

        setCharacter(found);
        setMainImg(found.picture?.[0] || found.image);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching character:", err);
        setCharacter(null);
        setLoading(false);
      });
  }, [characterId]);

  if (loading)
    return (
      <h2 style={{ textAlign: "center", marginTop: "60px", color: "yellow" }}>
        Loading...
      </h2>
    );

  if (!character)
    return (
      <h2 style={{ textAlign: "center", marginTop: "60px", color: "red" }}>
        Character not found 😢
      </h2>
    );

  const handleAddToCart = () => {
    const product = {
      id: character.id,
      name: character.name,
      image: mainImg,
      price: character.price,
      oldPrice: character.oldPrice,
      qty,
    };

    const oldCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = oldCart.find((item) => item.id === product.id);

    if (existing) existing.qty += qty;
    else oldCart.push(product);

    localStorage.setItem("cart", JSON.stringify(oldCart));
    setShowPopup(true);
  };

  const goToCart = () => {
    setShowPopup(false);
    navigate("/cart");
  };

  return (
    <div className="character-container">
      {/* 🔹 Wrapper for flex layout */}
      <div className="character-fallback">
        {/* Left - Images */}
        <div className="character-left">
          <div className="character-main-img">
            {mainImg && (
              <img
                src={mainImg}
                alt="product"
                onError={(e) => (e.target.src = "/img/default.jpg")}
              />
            )}
          </div>
          <div className="character-thumbs">
            {character.picture?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={mainImg === img ? "active-thumb" : ""}
                onClick={() => setMainImg(img)}
                onError={(e) => (e.target.src = "/img/default.jpg")}
              />
            ))}
          </div>
        </div>

        {/* Right - Details */}
        <div className="character-right">
          <h1 className="character-title">{character.name}</h1>
          <p className="character-sub">High quality</p>

          <div className="character-price-box">
            <span className="character-price">₹{character.price}</span>
            <span className="character-old-price">₹{character.oldPrice}</span>
            <span className="character-discount">{character.discount}</span>
          </div>

          <div className="qty-box">
            <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
            <input
              type="number"
              value={qty}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val > 0) setQty(val);
              }}
            />
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          <div className="character-actions">
            <button className="character-btn cart" onClick={handleAddToCart}>
              🛒 Add
            </button>
            <button className="character-btn buy" onClick={handleAddToCart}>
              Buy Now
            </button>
          </div>

          <div className="character-delivery">
            <p>🚚 Delivered in 3-5 days</p>
            <p>🛡️ 30 days warranty</p>
            <p>🔄 Easy 14 days return</p>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>✅ Product added to cart!</p>
            <button onClick={goToCart}>Go to Cart</button>
            <button onClick={() => setShowPopup(false)}>Continue Shopping</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Character;
