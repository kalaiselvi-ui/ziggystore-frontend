import React, { useContext } from "react";
import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { ToastContainer } from "react-toastify";
import ShippingScreen from "./screens/ShippingScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import DashboardScreen from "./screens/DashboardScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import AdminProductScreen from "./screens/AdminProductScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import AdminRoute from "./components/AdminRoure";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        style={{ width: "500px" }}
        className="foo"
        position="top-center"
        limit={1}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/signin" element={<SigninScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/admin/dashboard" element={<DashboardScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/payment" element={<PaymentMethodScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/orderhistory" element={<OrderHistoryScreen />} />
        <Route path="/admin/users" element={<UserListScreen />} />
        <Route path="/admin/user/:id" element={<UserEditScreen />} />
        <Route path="/admin/products" element={<AdminProductScreen />} />
        <Route path="/admin/product/:id" element={<ProductEditScreen />} />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <OrderListScreen />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
