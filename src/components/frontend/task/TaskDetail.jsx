import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import TaskService from "../../../services/TaskService";
import WorkProgressService from "../../../services/WorkProgressService";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const passedProgressList = location.state?.progressList || [];

  const [task, setTask] = useState(null);
  const [progressList, setProgressList] = useState(passedProgressList);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskAndProgress = async () => {
      try {
        const fetchedTask = await TaskService.getTaskById(id);
        const fetchedProgress = await WorkProgressService.getAll();

        setTask(fetchedTask);
        setProgressList(fetchedProgress || []);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskAndProgress();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "workProgressId" ? Number(value) : value;
    setTask((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleUpdate = async () => {
    try {
      const success = await TaskService.updateTask(task.id, task);
      if (success) {
        alert("Cập nhật thành công");
        navigate("/danh-sach-cong-viec");
      } else {
        alert("Cập nhật thất bại");
      }
    } catch (error) {
      alert("Có lỗi khi cập nhật công việc.");
    }
  };

  if (loading) {
    return <p className="text-white text-center mt-10">Đang tải...</p>;
  }

  if (!task) {
    return <p className="text-white text-center mt-10">Không tìm thấy công việc.</p>;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-xl bg-gray-800 text-gray-100 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-300 mb-6 text-center">Chi tiết công việc</h2>

        {/* Tiêu đề */}
        <label className="block mt-3 text-sm text-gray-200">Tiêu đề:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Mô tả */}
        <label className="block mt-3 text-sm text-gray-200">Mô tả:</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Chi tiết */}
        <label className="block mt-3 text-sm text-gray-200">Chi tiết:</label>
        <textarea
          name="detail"
          value={task.detail}
          onChange={handleChange}
          rows={4}
          className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Hạn chót */}
        <label className="block mt-3 text-sm text-gray-200">Hạn chót:</label>
        <input
          type="datetime-local"
          name="dueDate"
          value={task.dueDate?.slice(0, 16)}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Tiến độ */}
        <label className="block mt-3 text-sm text-gray-200">Tiến độ:</label>
        <select
          name="workProgressId"
          value={task.workProgressId}
          onChange={handleChange}
          className="w-full mt-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {progressList
            .filter((p) => task.allowedProgressIds?.includes(p.id))
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.status}
              </option>
            ))}
        </select>

        {/* Nút hành động */}
        <div className="flex justify-end space-x-2 mt-8">
          <button
            onClick={() => navigate("/danh-sach-cong-viec")}
            className="bg-gray-700 hover:bg-gray-600 text-gray-100 px-5 py-2 rounded-lg"
          >
            Hủy
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
