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
    return <p className="text-white text-center mt-10">Đang tải dữ liệu...</p>;

  if (!tasks || tasks.length === 0)
    return <p className="text-white text-center mt-10">Không có công việc nào.</p>;

  return (
    <div className="relative min-h-screen  text-white">
      <div className="relative z-10 max-w-5xl mx-auto py-12 px-6">
        {/* Nút quay lại */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow transition"
          >
            &larr; Quay lại
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-orange-400 mb-8">
          Danh sách công việc
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md hover:shadow-orange-500 transition duration-300"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-orange-300">{task.title}</h3>
                <p className="mt-2 text-gray-300">{task.description}</p>
              </div>

              <div className="text-sm space-y-1 text-gray-400">
                <p>
                  <span className="text-gray-500">Hạn chót:</span>{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleString()
                    : "Chưa đặt"}
                </p>
                <p>
                  <span className="text-gray-500">Tiến độ:</span>{" "}
                  <span className="text-green-400">
                    {getProgressStatus(task.workProgressId)}
                  </span>
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => navigate(`/chi-tiet-cong-viec/${task.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white shadow"
                >
                  Xem chi tiết
                </button>

                {task.workProgressId === 1 && (
                  <button
                    onClick={() => handleDelete(task.id, task.workProgressId)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white shadow"
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
