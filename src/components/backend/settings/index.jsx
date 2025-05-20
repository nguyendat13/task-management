import React from 'react';

const Setting = () => {
  return (
    <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      <h1 className="text-3xl font-bold mb-6">Cài đặt Quản trị</h1>

      {/* Thông tin tài khoản */}
      <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Thông tin tài khoản</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="admin-name">Tên quản trị viên</label>
            <input
              type="text"
              id="admin-name"
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Nhập tên quản trị viên"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="admin-email">Email</label>
            <input
              type="email"
              id="admin-email"
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Nhập email"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Lưu thay đổi
          </button>
        </form>
      </div>

      {/* Đổi mật khẩu */}
      <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Đổi mật khẩu</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="current-password">Mật khẩu hiện tại</label>
            <input
              type="password"
              id="current-password"
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Nhập mật khẩu hiện tại"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="new-password">Mật khẩu mới</label>
            <input
              type="password"
              id="new-password"
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Nhập mật khẩu mới"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="confirm-password">Xác nhận mật khẩu</label>
            <input
              type="password"
              id="confirm-password"
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Xác nhận mật khẩu mới"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>

      {/* Cài đặt hệ thống */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Cài đặt hệ thống</h2>
        <p className="text-gray-700 dark:text-gray-300">Tùy chỉnh các thông số hệ thống tại đây.</p>
      </div>
    </div>
  );
};

export default Setting;
