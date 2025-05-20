import React from 'react'

const Setting = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Cài đặt</h1>

      {/* Thông tin cá nhân */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Thông tin cá nhân</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="username">Tên người dùng</label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Nhập tên người dùng"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Đổi mật khẩu</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="current-password">Mật khẩu hiện tại</label>
            <input
              type="password"
              id="current-password"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Nhập mật khẩu hiện tại"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="new-password">Mật khẩu mới</label>
            <input
              type="password"
              id="new-password"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Nhập mật khẩu mới"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="confirm-password">Xác nhận mật khẩu</label>
            <input
              type="password"
              id="confirm-password"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
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

      {/* Cài đặt khác */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Cài đặt khác</h2>
        <p className="text-gray-700">Tùy chỉnh các cài đặt khác tại đây.</p>
      </div>
    </div>
  )
}

export default Setting
