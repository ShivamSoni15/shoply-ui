
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Storefront components
import Layout from "./components/Layout";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Categories from "./components/Categories";
import NewArrivals from "./components/NewArrivals";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import ShopDetails from "./components/ShopDetails";
import Checkout from "./components/Checkout";
import OrderTracking from "./components/OrderTracking";

// Authentication components
import Login from "./components/Login";
import Signup from "./components/Signup";

// Admin components
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import Orders from "./components/admin/Orders";
import Users from "./components/admin/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Storefront Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="shop" element={<Shop />} />

          <Route path="categories" element={<Categories />} />

          <Route path="new-arrivals" element={<NewArrivals />} />

          <Route path="contact" element={<Contact />} />

          <Route path="cart" element={<Cart />} />

          <Route path="shop-details" element={<ShopDetails />} />

          <Route path="checkout" element={<Checkout />} />

          {/* Order Tracking */}
          <Route path="track-order" element={<OrderTracking />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="products" element={<Products />} />

          <Route path="orders" element={<Orders />} />

          <Route path="users" element={<Users />} />
        </Route>

        {/* 404 / Unknown Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
