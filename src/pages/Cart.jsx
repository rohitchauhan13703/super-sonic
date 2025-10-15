import React, { useEffect, useState } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({ name: "", phone: "", city: "", pincode: "" });
  const [showPayment, setShowPayment] = useState(false);

  // 🧩 LocalStorage Cart 
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  // 🔁 Quantity Update
  const updateQty = (id, delta) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ❌ Remove Item
  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 💰 Total Price
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // 🏠 Address Form Submit
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (address.name && address.phone && address.city && address.pincode) {
      localStorage.setItem("userAddress", JSON.stringify(address));
      setShowPayment(true); // payment section 
    } else {
      alert("Please fill all fields!");
    }
  };

  // 💳 Order Place
  const handlePlaceOrder = () => {
    alert("🎉 Order Placed Successfully!");
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Your Sonic Cart</h1>

      {/*payment cart*/}
      {!showPayment && (
        <>
          {cartItems.length === 0 ? (
            <p className="empty-msg">No items in your cart yet.</p>
          ) : (
            <>
              <div className="cart-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-img" />
                    <div className="cart-info">
                      <h3>{item.name}</h3>
                      <p>₹{item.price}</p>
                      <div className="qty-control">
                        <button className="qty-btn minus" onClick={() => updateQty(item.id, -1)}>
                          −
                        </button>
                        <span className="qty-number">{item.qty}</span>
                        <button className="qty-btn plus" onClick={() => updateQty(item.id, 1)}>
                          +
                        </button>
                      </div>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* 💰 Total + Address */}
              <div className="cart-summary">
                <h2>Total: ₹{total}</h2>

                {/* Address Form */}
                <form className="address-form" onSubmit={handleAddressSubmit}>
                  <h3>Enter Your Address</h3>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    required
                  />
                  <button type="submit" className="checkout-btn">
                    Save & Continue to Payment
                  </button>
                </form>
              </div>
            </>
          )}
        </>
      )}

      {/* 💳 Payment Section — Address save  */}
      {showPayment && (
        <div className="payment-section">
          <h2>💳 Select Payment Method</h2>
          <div className="payment-options">
            <button className="checkout-btn">UPI</button>
            <button className="checkout-btn">Debit / Credit Card</button>
            <button className="checkout-btn">Cash on Delivery</button>
          </div>

          <button className="checkout-btn" onClick={handlePlaceOrder}>
            ✅ Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
