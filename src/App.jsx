import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MainPage from "./pages/MainPage";
import Header from "./components/common/layout/Header";
import { Routes, Route } from "react-router-dom";
import MenuPage from "./pages/Menu/MenuPage";
import Cart from "./pages/Cart";
import Order from "./pages/order";
import OrderSumary from "./pages/OrderSumary";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/menupage" element={<MenuPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/ordersumary/:orderId?" element={<OrderSumary />} />




      </Routes>
      
    </div>
  );
}

export default App;
