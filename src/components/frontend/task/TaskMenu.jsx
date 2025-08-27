import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPlus,
  faTasks,
  faUsers,
  faUserPlus,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const TaskMenu = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <aside
      className={`relative z-10 bg-gray-800 text-gray-100 p-6 fixed h-full transition-transform duration-300 
        ${menuOpen ? "translate-x-0 w-64 shadow-xl" : "-translate-x-full hidden"}`}
    >
      {/* Nút đóng menu */}
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-4 right-4 text-white text-xl hover:text-gray-300 transition-all duration-300"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      {/* Tiêu đề */}
  <h2 className="text-xl font-semibold mb-6 text-blue-300">Menu</h2>

      {/* Danh sách nút */}
      <nav className="space-y-3">
        <button
          onClick={() => handleNavigate("/them-cong-viec-moi")}
          className="flex items-center w-full text-left bg-blue-600/90 text-gray-100 p-2.5 rounded-xl shadow hover:bg-blue-700/90 transition-all gap-2"
        >
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
          <span className="text-sm font-medium">Thêm việc mới</span>
        </button>

        <button
          onClick={() => handleNavigate("/danh-sach-cong-viec")}
          className="flex items-center w-full text-left bg-blue-600/90 text-gray-100 p-2.5 rounded-xl shadow hover:bg-blue-700/90 transition-all gap-2"
        >
          <FontAwesomeIcon icon={faTasks} className="w-4 h-4" />
          <span className="text-sm font-medium">Công việc</span>
        </button>

        <button
          onClick={() => handleNavigate("/tao-nhom-moi")}
          className="flex items-center w-full text-left bg-blue-600/90 text-gray-100 p-2.5 rounded-xl shadow hover:bg-blue-700/90 transition-all gap-2"
        >
          <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
          <span className="text-sm font-medium">Tạo nhóm mới</span>
        </button>
        <button
          onClick={() => handleNavigate("/danh-sach-nhom")}
          className="flex items-center w-full text-left bg-blue-600/90 text-gray-100 p-2.5 rounded-xl shadow hover:bg-blue-700/90 transition-all gap-2"
        >
          <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4" />
          <span className="text-sm font-medium">Danh sách nhóm</span>
        </button>
        <button
          onClick={() => handleNavigate("/tham-gia-nhom")}
          className="flex items-center w-full text-left bg-blue-600/90 text-gray-100 p-2.5 rounded-xl shadow hover:bg-blue-700/90 transition-all gap-2"
        >
          <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4" />
          <span className="text-sm font-medium">Tham gia nhóm</span>
        </button>
      </nav>
    </aside>
  );
};

export default TaskMenu;
