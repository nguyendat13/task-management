import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faPlus, faTasks } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex">
      {/* Lớp overlay làm mờ nền (GIỮ NGUYÊN) */}
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-lg"></div>

      {/* Button mở menu (chỉ hiện khi menu đóng) */}
      {!menuOpen && (
        <button
          onClick={() => setMenuOpen(true)}
          className="absolute top-6 left-8 z-20 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-all"
        >
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </button>
      )}

      {/* Menu bên trái */}
      <aside
        className={`relative z-10 bg-gray-900 bg-opacity-95 text-white p-6 fixed h-full transition-transform duration-300 
          ${menuOpen ? "translate-x-0 w-64 shadow-xl" : "-translate-x-full hidden"}`}
      >
        {/* Button đóng menu */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-white text-xl hover:text-gray-300 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="text-xl font-semibold mb-6 text-orange-400">📌 Menu</h2>
        <nav className="space-y-4">
          <button className="block w-full text-left bg-orange-500 text-white p-3 rounded-lg shadow-md hover:bg-orange-600 transition-all">
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Thêm việc mới
          </button>
          <button className="block w-full text-left bg-orange-500 text-white p-3 rounded-lg shadow-md hover:bg-orange-600 transition-all">
            <FontAwesomeIcon icon={faTasks} className="mr-2" /> Công việc
          </button>
        </nav>
      </aside>

      {/* Nội dung bên phải */}
      <main className="relative z-10 flex-1 p-24 left-[40px] bottom-[50px] text-white">
        <h1 className="text-3xl font-bold text-orange-400">🚀 Nội dung công việc</h1>
        <p className="mt-4 text-lg max-w-2xl leading-relaxed">
          Chào mừng bạn đến với hệ thống quản lý công việc! Theo dõi, sắp xếp và hoàn thành các nhiệm vụ một cách hiệu quả.
        </p>
      </main>
    </div>
  );
};

export default Home;
