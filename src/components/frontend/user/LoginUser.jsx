import React, { useState } from "react";
import { login } from "../../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function LoginUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = "https://localhost:7029/api/googlelogin/google";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ userNameOrEmail: username, password });
      console.log("Đăng nhập thành công:", data);
      navigate("/ho-so");
      window.location.reload();
    } catch (err) {
      setError(err.message || "Lỗi đăng nhập");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-6">
          Đăng nhập
        </h2>

        {/* Input - Username */}
        <label htmlFor="username" className="text-sm text-gray-700 font-medium">
          Email hoặc Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nhập email hoặc username"
          required
          className="mt-1 mb-4 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        {/* Input - Password */}
        <label htmlFor="password" className="text-sm text-gray-700 font-medium">
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu"
          required
          className="mt-1 mb-4 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center text-sm font-semibold mb-4">
            {error}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Đăng nhập
        </button>

        {/* Google Login Button */}
        <div
          onClick={handleGoogleLogin}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg cursor-pointer hover:bg-red-600 transition"
        >
          <FontAwesomeIcon icon={faGoogle} className="text-lg" />
          <span className="font-semibold">Đăng nhập với Google</span>
        </div>

        {/* Extra Links */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <button
            type="button"
            className="hover:underline"
            onClick={() => alert("Chức năng quên mật khẩu")}
          >
            Quên mật khẩu?
          </button>
          <Link to="/dang-ky" className="hover:underline font-medium text-indigo-600">
            Đăng ký tài khoản
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginUser;
