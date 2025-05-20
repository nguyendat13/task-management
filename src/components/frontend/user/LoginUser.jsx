import React, { useState } from "react";
import { login } from "../../../services/AuthService";
import { Link } from "react-router-dom";

function LoginUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ userNameOrEmail: username, password });
      console.log("Đăng nhập thành công:", data);
      // xử lý chuyển trang, lưu token ...
    } catch (err) {
      setError(err.message || "Lỗi đăng nhập");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg max-w-md w-full p-10"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Đăng nhập
        </h2>

        {/* Username Input */}
        <label
          htmlFor="username"
          className="block text-gray-700 font-semibold mb-2"
        >
          Email hoặc Username
        </label>
        <div className="relative mb-6">
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập email hoặc username"
            required
            className="w-full pl-10 pr-3 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 12a4 4 0 01-8 0 4 4 0 018 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14v7"
            ></path>
          </svg>
        </div>

        {/* Password Input */}
        <label
          htmlFor="password"
          className="block text-gray-700 font-semibold mb-2"
        >
          Mật khẩu
        </label>
        <div className="relative mb-6">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            required
            className="w-full pl-10 pr-3 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v-3m0 0V9m0 3h.01"
            ></path>
            <rect
              width="14"
              height="8"
              x="5"
              y="11"
              rx="2"
              ry="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></rect>
          </svg>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition"
        >
          Đăng nhập
        </button>

        {/* Error message */}
        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
        )}

        {/* Links */}
        <div className="mt-6 flex justify-between text-sm text-indigo-600">
          <button
            type="button"
            className="hover:underline focus:outline-none"
            onClick={() => alert("Chức năng quên mật khẩu")}
          >
            Quên mật khẩu?
          </button>
          <Link to="/dang-ky"
            type="button"
            className="hover:underline focus:outline-none"
          >
            Đăng ký tài khoản
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginUser;
