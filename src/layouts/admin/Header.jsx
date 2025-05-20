import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell, faSignOutAlt, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="bg-blue-600 dark:bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        {/* Nút thông báo */}
        <button className="relative">
          <FontAwesomeIcon icon={faBell} className="w-6 h-6" />
        </button>

        {/* Nút chuyển đổi Dark/Light Mode */}
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 ">
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="w-6 h-6" />
        </button>

        {/* Nút tài khoản */}
        <button>
          <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
