import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faPlus, faTasks } from "@fortawesome/free-solid-svg-icons";
import TaskPage from "./task/TaskPage";

const Home = () => {

  return (
    <div className="relative min-h-screen flex">
      {/* Lớp overlay làm mờ nền (GIỮ NGUYÊN) */}
      <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-lg"></div>



      {/* Menu bên trái */}
          {/* Task menu (truyền props) */}
      <TaskPage />

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
