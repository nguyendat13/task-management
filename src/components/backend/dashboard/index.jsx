import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-8">Chào mừng đến với Bảng điều khiển quản trị</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Tổng số người dùng</h2>
          <p className="text-4xl font-bold text-blue-600">150</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Tổng doanh thu</h2>
          <p className="text-4xl font-bold text-green-600">$5,000</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold mb-2">Tổng số đơn hàng</h2>
          <p className="text-4xl font-bold text-purple-600">320</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
