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

  const getProgressStatus = (id) => {
    const progress = progressList.find((item) => item.id === id);
    return progress ? progress.status : "Không rõ";
  };

  // Xóa task nếu tiến độ = 1
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

  // Cập nhật tiến độ công việc
const handleProgressChange = async (taskId, newProgressId) => {
  try {
    // Lấy task hiện tại từ API
    const currentTask = await TaskService.getTaskById(taskId);
    if (!currentTask) {
      alert("Không tìm thấy công việc");
      return;
    }

    // Tạo object cập nhật, giữ nguyên userId, groupId
    const updatedTaskData = {
      ...currentTask,
      workProgressId: newProgressId,
    };

    // Gọi API cập nhật task (giả sử có hàm updateTask)
    await TaskService.updateTask(updatedTaskData);

    // Cập nhật lại trong state local
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, workProgressId: newProgressId } : task
    ));

    alert("Cập nhật tiến độ thành công");
  } catch (error) {
    console.error(error);
    alert("Cập nhật tiến độ thất bại");
  }
};


  if (loading) return <p className="text-white text-center mt-10">Đang tải dữ liệu...</p>;
  if (!tasks || tasks.length === 0)
    return <p className="text-white text-center mt-10">Không có công việc nào.</p>;

  return (
   <div className="relative min-h-screen">
      {/* Nền mờ */}
      <div className="absolute  inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-0"></div>

      {/* Nội dung */}
      <div className="relative z-10 space-y-6 max-w-4xl mx-auto p-6">
        {/* Nút quay lại */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow"
        >
          &larr; Quay lại
        </button>

        <h2 className="text-2xl text-orange-400 font-bold text-center">
          Danh sách công việc
        </h2>

        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-900 p-6 rounded-lg shadow-lg text-white hover:shadow-orange-500 transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-orange-400">{task.title}</h3>
                <p className="mt-2 text-gray-300">{task.description}</p>
                <p className="mt-1 text-sm text-gray-400">
                  Hạn chót:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleString()
                    : "Chưa đặt hạn chót"}
                </p>
                <p className="mt-1 text-sm text-green-400">
                  Tiến độ: {getProgressStatus(task.workProgressId)}
                </p>
              </div>

              <div className="flex flex-col items-end space-y-3">
                <select
                  value={task.workProgressId}
                  onChange={(e) =>
                    handleProgressChange(task.id, Number(e.target.value))
                  }
                  className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {progressList.map((progress) => (
                    <option key={progress.id} value={progress.id}>
                      {progress.status}
                    </option>
                  ))}
                </select>

                {task.workProgressId === 1 && (
                  <button
                    onClick={() => handleDelete(task.id, task.workProgressId)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded shadow"
                  >
                    Xóa
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
