import React, { useEffect, useState } from "react";
import TaskService from "../../../services/TaskService";
import WorkProgressService from "../../../services/WorkProgressService";
import { getUserIdFromLocalStorage } from "../../../services/utils/auth";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = getUserIdFromLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const [taskData, progressData] = await Promise.all([
          TaskService.getTasksByUserId(userId),
          WorkProgressService.getAll(),
        ]);
        setTasks(taskData || []);
        setProgressList(progressData || []);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  const handleDelete = async (taskId, workProgressId) => {
    if (workProgressId !== 1) {
      alert("Chỉ có thể xóa công việc khi tiến độ là 1 (Mới tạo).");
      return;
    }
    if (!window.confirm("Bạn có chắc muốn xóa công việc này?")) return;

    try {
      await TaskService.deleteTask(taskId);
      alert("Xóa công việc thành công.");
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(error);
      alert("Xóa công việc thất bại.");
    }
  };

  const getProgressStatus = (id) => {
    const progress = progressList.find((item) => item.id === id);
    return progress ? progress.status : "Không rõ";
  };

  if (loading)
    return <p className="text-gray-400 text-center mt-10">Đang tải dữ liệu...</p>;

  if (!tasks || tasks.length === 0)
    return <p className="text-gray-400 text-center mt-10">Không có công việc nào.</p>;

  return (
    <div className="relative min-h-screen bg-gray-900">
      <div className="relative z-10 max-w-2xl mx-auto py-10 px-4">
        {/* Nút quay lại */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-100 rounded-lg shadow-sm transition"
          >
            &larr; Quay lại
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center text-blue-300 mb-8 tracking-tight">
          Danh sách công việc
        </h2>

        <div className="space-y-5">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow hover:shadow-blue-900 transition duration-200 flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-100 truncate">{task.title}</h3>
                <p className="mt-1 text-gray-400 text-sm truncate">{task.description}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                  <span>
                    <span className="font-medium text-gray-300">Hạn chót:</span> {task.dueDate ? new Date(task.dueDate).toLocaleString() : "Chưa đặt"}
                  </span>
                  <span>
                    <span className="font-medium text-gray-300">Tiến độ:</span> <span className="text-green-400">{getProgressStatus(task.workProgressId)}</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 ml-4 shrink-0">
                <button
                  onClick={() => navigate(`/chi-tiet-cong-viec/${task.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-white text-xs font-medium shadow-sm"
                >
                  Xem
                </button>
                {task.workProgressId === 1 && (
                  <button
                    onClick={() => handleDelete(task.id, task.workProgressId)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-white text-xs font-medium shadow-sm"
                  >
                    Xóa
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
