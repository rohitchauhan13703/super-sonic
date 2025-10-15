import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// 🔹 Common Components
import Navbar from "../Navbar/Navbar";

// 🔹 Pages
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Character from "../pages/Character"; // ✅ Dynamic character page

// 🔹 Layout (Navbar + Outlet)
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

// 🔹 Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      { path: "/character/:characterId", element: <Character /> }, // ✅ Dynamic route
      {
        path: "*",
        element: (
          <div style={{ textAlign: "center", marginTop: "80px" }}>
            <h1>404 - Page Not Found 😢</h1>
          </div>
        ),
      },
    ],
  },
]);

// 🔹 Main Export
const RoutesComponent = () => {
  return <RouterProvider router={router} />;
};

export default RoutesComponent;
