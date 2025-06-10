import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupService from "../../../services/GroupService";
import { getUserIdFromLocalStorage } from "../../../services/utils/auth"; // ⬅ Thêm hàm lấy userId

const AddGroup = () => {
  const [form, setForm] = useState({
    name: "",
    duty: "",
  });
  const navigate = useNavigate();
  const userId = getUserIdFromLocalStorage(); // ✅ Lấy userId từ localStorage

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      return;
    }

    const dataToSend = {
      ...form,
      userId: userId, // ✅ Gửi kèm userId
    };

    try {
      const createdGroup = await GroupService.createGroup(dataToSend);
      if (createdGroup) {
        alert("Tạo nhóm thành công!");
        navigate("/danh-sach-nhom");
      } else {
        alert("Tạo nhóm thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi tạo nhóm:", error);
      alert("Đã xảy ra lỗi khi tạo nhóm.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl text-orange-400 font-bold text-center">Tạo Nhóm Mới</h2>

        <input
          name="name"
          placeholder="Tên nhóm"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        <textarea
          name="duty"
          placeholder="Nhiệm vụ của nhóm"
          value={form.duty}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows={4}
          required
        ></textarea>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-600 px-5 py-2 rounded hover:bg-gray-700 transition text-white"
          >
            Quay lại
          </button>
          <button
            type="submit"
            className="bg-orange-500 px-5 py-2 rounded hover:bg-orange-600 transition text-white font-semibold"
          >
            Tạo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGroup;
