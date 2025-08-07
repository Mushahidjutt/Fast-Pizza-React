import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MainPage from "./pages/MainPage";
import Header from "./components/common/layout/Header";
import { Routes, Route } from "react-router-dom";
import MenuPage from "./pages/Menu/MenuPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/menupage" element={<MenuPage />} />
      </Routes>
      {/* <Header />
      <MainPage /> */}
    </div>
  );
}

export default App;
