import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaUser } from "react-icons/fa";
import "./Navbar.css";
import logoImg from "../img/sonic png/1 (2).png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  // 🟢 Fetch products from API
  useEffect(() => {
    fetch("http://localhost:5002/shop")
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : data.shop || []);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // 🟠 Filter products based on search
  useEffect(() => {
    if (search.trim() === "") {
      setFiltered([]);
    } else {
      const result = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(result);
    }
  }, [search, products]);

  // 🟣 Navigate to Character page
  const handleSelect = (id) => {
    setSearch("");
    setFiltered([]);
    navigate(`/character/${id}`);
  };

  return (
    <nav className="navbar">
      <div className="left">
        <img src={logoImg} alt="logo" className="logo" />
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>

        {/* 🔹 Search Dropdown */}
        {filtered.length > 0 && (
          <div className="search-dropdown">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="search-item"
                onClick={() => handleSelect(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="search-thumb"
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="right">
        {/* Hamburger Icon for Mobile */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li className="login-cart">
            <Link to="/login" className="login-link">
              <FaUser /> Login
            </Link>
            <Link to="/cart" className="cart">
              <FaShoppingCart />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
