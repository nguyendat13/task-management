import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faTasks } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const TaskMenu = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <aside
      className={`relative z-10 bg-gray-900 bg-opacity-95 text-white p-6 fixed h-full transition-transform duration-300 
        ${menuOpen ? "translate-x-0 w-64 shadow-xl" : "-translate-x-full hidden"}`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-4 right-4 text-white text-xl hover:text-gray-300 transition-all duration-300"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      <h2 className="text-xl font-semibold mb-6 text-orange-400">📌 Menu</h2>
      <nav className="space-y-4">
        <button
          onClick={() => handleNavigate("/them-cong-viec-moi")}
          className="block w-full text-left bg-orange-500 text-white p-3 rounded-lg shadow-md hover:bg-orange-600 transition-all"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" /> Thêm việc mới
        </button>
        <button
          onClick={() => handleNavigate("/danh-sach-cong-viec")}
          className="block w-full text-left bg-orange-500 text-white p-3 rounded-lg shadow-md hover:bg-orange-600 transition-all"
        >
          <FontAwesomeIcon icon={faTasks} className="mr-2" /> Công việc
        </button>
      </nav>
    </aside>
  );
};

export default TaskMenu;
