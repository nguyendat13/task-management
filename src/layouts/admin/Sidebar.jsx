import React, { useState } from 'react';
import { FaBars, FaAngleLeft, FaHome, FaUser, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`bg-gray-800 text-white h-full transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Nút toggle sidebar */}
      <button
        onClick={toggleSidebar}
        className="text-white p-2 hover:text-gray-400 transition duration-200"
      >
        {isSidebarOpen ? <FaAngleLeft /> : <FaBars />}
      </button>

      {/* Danh sách menu */}
      <ul className="mt-6 space-y-4">
        <SidebarItem to="/admin/dashboard" icon={<FaHome />} text="Bảng điều khiển" isOpen={isSidebarOpen} />
        <SidebarItem to="/admin/users" icon={<FaUser />} text="Người dùng" isOpen={isSidebarOpen} />
        <SidebarItem to="/admin/settings" icon={<FaCog />} text="Cài đặt" isOpen={isSidebarOpen} />
      </ul>
    </div>
  );
};

const SidebarItem = ({ to, icon, text, isOpen }) => {
  return (
    <Link
      to={to}
      className="flex items-center space-x-3 py-2 px-4 rounded-md text-lg hover:bg-indigo-500 transition duration-300"
      data-tooltip-id={text} // ID để gán tooltip
    >
      <span className="text-xl">{icon}</span>
      {isOpen && <span>{text}</span>}
      {!isOpen && <Tooltip id={text} place="right" content={text} />}
    </Link>
  );
};

export default Sidebar;
