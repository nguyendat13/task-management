import React from "react";
import TaskPage from "./task/TaskPage";

const Home = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-900">
      <main className="w-full max-w-2xl mx-auto p-8 bg-gray-800 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4"> Quản lý công việc của bạn</h1>
        <p className="mt-2 text-base md:text-lg text-gray-200 leading-relaxed">
          Chào mừng bạn đến với ứng dụng quản lý công việc!<br/>
          Hãy tạo, theo dõi và hoàn thành các nhiệm vụ mỗi ngày một cách dễ dàng và hiệu quả.
        </p>
      </main>
    </div>
  );
};

export default Home;
