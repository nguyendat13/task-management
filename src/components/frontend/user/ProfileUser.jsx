import React, { useState } from "react";
import {jwtDecode} from "jwt-decode";
import UserService from "../../../services/UserService";
import { useNavigate } from "react-router-dom";

const ProfileUser = () => {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const userId = user ? user.userId : null;
  const navigate = useNavigate();

  // Thêm name vào formData và cập nhật các trường cần thiết
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.sub || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    gender: user?.gender || "",
    roleId: user?.roleId  || "",
  });

  const [message, setMessage] = useState("");

 const handleUpdateInfo = async () => {
  if (!userId) {
    setMessage("Không xác định được userId");
    return;
  }

  try {
    console.log("Gửi payload cập nhật:", formData);

    // Gọi API cập nhật
    const response = await UserService.updateUser(userId, formData);

    if (response) {
      // Nếu backend trả về token mới, lưu lại và decode
      if (response.token) {
        localStorage.setItem("token", response.token);
        const decoded = jwtDecode(response.token);

        // Cập nhật lại formData theo thông tin mới nhất
        setFormData({
          name: decoded.name || "",
          username: decoded.sub || "",
          email: decoded.email || "",
          phone: decoded.phone || "",
          address: decoded.address || "",
          gender: decoded.gender || "",
          roleId: decoded.roleId || "",
        });

        console.log("Thông tin mới sau cập nhật:", decoded);
      } else {
        // Nếu không có token mới, gọi lại getUserById để đồng bộ
        const updatedUser = await UserService.getUserById(userId);
        if (updatedUser) {
          setFormData({
            name: updatedUser.name || "",
            username: updatedUser.username || "",
            email: updatedUser.email || "",
            phone: updatedUser.phone || "",
            address: updatedUser.address || "",
            gender: updatedUser.gender || "",
            roleId: updatedUser.roleId || "",
          });
        }
      }

      setMessage("Cập nhật thông tin thành công");
    } else {
      setMessage("Cập nhật thất bại");
    }
  } catch (error) {
    if (error.response) {
      console.error("Lỗi phản hồi từ server:", error.response.data);
      setMessage("Cập nhật thất bại: " + JSON.stringify(error.response.data));
    } else {
      setMessage("Cập nhật thất bại: " + error.message);
    }
  }
};



  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (!userId) {
      alert("Không xác định được userId");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }
    const payload = {
      oldPassword: currentPassword,
      newPassword,
      confirmPassword,
    };

    try {
      const result = await UserService.changePassword(userId, payload);
      alert(result);
      localStorage.removeItem("token");
      navigate("/dang-nhap");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      alert("Đổi mật khẩu thất bại: " + (error.message || ""));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-6 text-center">Thông tin tài khoản</h2>

        <label className="block mb-2 font-medium text-gray-700">Họ và tên</label>
        <input
          type="text"
          className="border rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Họ và tên"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <label className="block mb-2 font-medium text-gray-700">Tên đăng nhập</label>
        <input
          type="text"
          className="border rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Tên đăng nhập"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />

        <label className="block mb-2 font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="border rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label className="block mb-2 font-medium text-gray-700">Số điện thoại</label>
        <input
          type="tel"
          className="border rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <label className="block mb-2 font-medium text-gray-700">Địa chỉ</label>
        <input
          type="text"
          className="border rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Địa chỉ"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />

        <label className="block mb-2 font-medium text-gray-700">Giới tính</label>
        <select
          className="border rounded-md p-2 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <option value="">-- Chọn giới tính --</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>

        <button
          onClick={handleUpdateInfo}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded w-full mb-8 transition duration-300"
        >
          Cập nhật thông tin
        </button>

        <h3 className="text-xl font-semibold mb-4">Đổi mật khẩu</h3>

        <input
          type="password"
          placeholder="Mật khẩu hiện tại"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu mới"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border rounded-md p-2 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleChangePassword}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded w-full transition duration-300"
        >
          Đổi mật khẩu
        </button>

        {message && (
          <p className="mt-4 text-center text-red-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileUser;
