// Admin.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Admin = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className={`flex h-screen ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Sidebar darkMode={darkMode} />
      <div className="flex-1 flex flex-col">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-800 transition-all">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Admin;
