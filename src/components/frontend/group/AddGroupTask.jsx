import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskService from "../../../services/TaskService";
import { getUserIdFromLocalStorage } from "../../../services/utils/auth";

const AddGroupTask = () => {
  const navigate = useNavigate();
  const { groupId } = useParams(); // Lấy groupId từ URL nếu có
  const userId = getUserIdFromLocalStorage();
  const [form, setForm] = useState({
    title: "",
    description: "",
    detail: "",
    dueDate: "",
    dueTime: "12:00", 
  });

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

    const dueDateTime =
      form.dueDate && form.dueTime
        ? `${form.dueDate}T${form.dueTime}:00`
        : null;

    const taskPayload = {
      title: form.title,
      description: form.description,
      detail: form.detail,
      dueDate: dueDateTime,
      userId: parseInt(userId),
      workProgressId: 1, // nếu có mặc định
      groupId: groupId ? parseInt(groupId) : null, // thêm groupId nếu có
    };

    try {
      await TaskService.createTask(taskPayload);
      alert("Thêm công việc thành công!");
      navigate(groupId ? `/nhom/${groupId}` : "/danh-sach-cong-viec");
    } catch (error) {
      alert("Thêm công việc thất bại!");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl text-orange-400 font-bold text-center">
          Thêm công việc {groupId ? "trong nhóm" : "mới"}
        </h2>

        <input
          name="title"
          placeholder="Tiêu đề"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-600 bg-gray-900 text-white"
          required
        />
        <input
          name="description"
          placeholder="Mô tả ngắn"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-600 bg-gray-900 text-white"
        />
        <textarea
          name="detail"
          placeholder="Chi tiết"
          value={form.detail}
          onChange={handleChange}
          rows={5}
          className="w-full p-3 rounded border border-gray-600 bg-gray-900 text-white"
        />

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-1 text-gray-300">Ngày</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              min={today}
              required
              className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-300">Giờ</label>
            <input
              type="time"
              name="dueTime"
              value={form.dueTime}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
            />
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-600 px-5 py-2 rounded hover:bg-gray-700"
          >
            Quay lại
          </button>
          <button
            type="submit"
            className="bg-orange-500 px-5 py-2 rounded hover:bg-orange-600 text-white font-semibold"
          >
            Tạo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGroupTask;
