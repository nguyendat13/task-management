import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GroupItemTaskService from "../../../../services/GroupItemTaskService";
import WorkProgressService from "../../../../services/WorkProgressService";

const GroupTasks = () => {
  const { id: groupId } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [taskData, progressData] = await Promise.all([
          GroupItemTaskService.getTasksByGroupId(groupId),
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
  }, [groupId]);

  const getProgressStatus = (id) => {
    const progress = progressList.find((item) => item.id === id);
    return progress ? progress.status : "Không rõ";
  };

  if (loading)
  return <p className="text-gray-100 text-center mt-10">Đang tải dữ liệu...</p>;

  if (!tasks || tasks.length === 0)
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
        <button
          onClick={() => navigate(`/chi-tiet-nhom/${groupId}/thanh-vien`)}
          className="mb-6 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-100 px-4 py-2 rounded-lg shadow-sm"
        >
          &larr; Quay lại thành viên
        </button>
        <p className="text-center text-lg">Không có công việc nào.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Nút quay lại */}
        <div className="mb-8 flex items-center">
          <button
            onClick={() => navigate(`/chi-tiet-nhom/${groupId}/thanh-vien`)}
            className="bg-gray-800 border border-gray-700 hover:bg-gray-700 text-gray-100 px-4 py-2 rounded-lg shadow-sm"
          >
            &larr; Quay lại thành viên
          </button>
        </div>

        <h2 className="text-2xl font-bold text-blue-300 mb-8 text-center">
          Danh sách công việc nhóm
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-blue-400 transition duration-300"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-blue-200">{task.taskTitle}</h3>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupTasks;
