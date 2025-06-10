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
    <div className="max-w-2xl mx-auto bg-gray-900 text-white p-6 rounded-lg mt-10 shadow-lg">
      <h2 className="text-2xl font-bold text-orange-400 mb-4">Chi tiết công việc</h2>

      {/* Tiêu đề */}
      <label className="block mt-3 text-sm">Tiêu đề:</label>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
      />

      {/* Mô tả */}
      <label className="block mt-3 text-sm">Mô tả:</label>
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
      />

      {/* Chi tiết */}
      <label className="block mt-3 text-sm">Chi tiết:</label>
      <textarea
        name="detail"
        value={task.detail}
        onChange={handleChange}
        rows={4}
        className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
      />

      {/* Hạn chót */}
      <label className="block mt-3 text-sm">Hạn chót:</label>
      <input
        type="datetime-local"
        name="dueDate"
        value={task.dueDate?.slice(0, 16)}
        onChange={handleChange}
        className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
      />

      {/* Tiến độ */}
      <label className="block mt-3 text-sm">Tiến độ:</label>
      <select
        name="workProgressId"
        value={task.workProgressId}
        onChange={handleChange}
        className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
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
      <div className="flex justify-end space-x-2 mt-6">
        <button
          onClick={() => navigate("/danh-sach-cong-viec")}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Hủy
        </button>
        <button
          onClick={handleUpdate}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;
