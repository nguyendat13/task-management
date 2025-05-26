import React, { useState } from "react";
import TaskService from "../../../services/TaskService";
import { getUserIdFromLocalStorage } from "../../../services/utils/auth";
import { useNavigate } from "react-router-dom";
import TaskPage from "./TaskPage";

const AddTask = ({ onTaskCreated }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    detail: "",
    dueDate: "",
    dueTime: "12:00",
    groupId: null,
    workProgressId: 1,
  });
  const navigate = useNavigate();

  const userId = getUserIdFromLocalStorage();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Không tìm thấy userId, vui lòng đăng nhập lại!");
      navigate("/dang-nhap");
      return;
    }

    // Kết hợp dueDate và dueTime thành 1 datetime nếu cần backend hỗ trợ
    const dueDateTime = form.dueDate && form.dueTime ? `${form.dueDate}T${form.dueTime}:00` : null;

    const newTask = { 
      ...form, 
      userId,
      dueDate: dueDateTime || form.dueDate, 
    };

    try {
      await TaskService.createTask(newTask);
      alert("Thêm task thành công!");
      navigate("/danh-sach-cong-viec")
    } catch (error) {
      console.error(error);
      alert("Thêm task thất bại!");
    }
  };

  // Lấy ngày hiện tại để làm min cho dueDate
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl text-orange-400 font-bold text-center">Thêm công việc mới</h2>

        <input
          name="title"
          placeholder="Tiêu đề"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />
        <input
          name="description"
          placeholder="Mô tả ngắn"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <textarea
          name="detail"
          placeholder="Chi tiết"
          value={form.detail}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows={5}
        ></textarea>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-1 text-gray-300">Hạn chót (Ngày)</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              min={today}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-300">Hạn chót (Giờ)</label>
            <input
              type="time"
              name="dueTime"
              value={form.dueTime}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
             onClick={() => navigate("/")}
            className="bg-gray-600 px-5 py-2 rounded hover:bg-gray-700 transition"
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

export default AddTask;
