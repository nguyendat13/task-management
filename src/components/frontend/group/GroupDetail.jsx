import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GroupItemUserService from "../../../services/GroupItemUserService";
import GroupItemTaskService from "../../../services/GroupItemTaskService";
import { getUserIdFromLocalStorage } from "../../../services/utils/auth";
import WorkProgressService from "../../../services/WorkProgressService";
import GroupService from "../../../services/GroupService";

const GroupDetail = () => {
  const { id: groupId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("members");
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLeader, setIsLeader] = useState(false);
  const [groupInfo, setGroupInfo] = useState(null);

  const currentUserId = getUserIdFromLocalStorage();

  useEffect(() => {
    fetchData();
  }, [groupId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [userRes, taskRes, progressRes,groupRes] = await Promise.all([
        GroupItemUserService.getUsersByGroupId(groupId),
        GroupItemTaskService.getTasksByGroupId(groupId),
        WorkProgressService.getAll(),
        GroupService.getGroupById(groupId), // gọi API lấy group

      ]);

      setMembers(userRes || []);
      setTasks(taskRes || []);
      setProgressList(progressRes || []);
      setGroupInfo(groupRes?.data || groupRes); 
      
      const currentUser = userRes?.find((u) => u.userId === currentUserId);
      setIsLeader(currentUser?.isLeader || false);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
    setLoading(false);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Bạn có chắc muốn xoá công việc này?")) return;
    const ok = await GroupItemTaskService.deleteGroupTask(taskId);
    if (ok) {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const getProgressStatus = (id) => {
    const progress = progressList.find((p) => p.id === id);
    return progress ? progress.status : "Không rõ";
  };

  return (
    <div className="min-h-screen text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">
         {/* Nút quay lại */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/danh-sach-nhom")}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow transition"
          >
            &larr; Quay lại
          </button>
        </div>
        <h1 className="text-3xl font-bold text-orange-400 mb-8 text-center">
          Chi tiết nhóm
        </h1>
            {groupInfo && (
            <p className="text-center text-gray-300 mb-6">
                Mã nhóm: <span className="text-white font-semibold">{groupInfo.groupCode}</span>{" "}
                - Tên nhóm: <span className="text-white font-semibold">{groupInfo.name}</span>
            </p>
            )}
        {/* Tabs */}
        <div className="flex justify-center mb-8 gap-6">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "members"
                ? "bg-orange-500"
                : "bg-gray-700 hover:bg-gray-600"
            } transition`}
            onClick={() => setActiveTab("members")}
          >
            Thành viên
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "tasks"
                ? "bg-orange-500"
                : "bg-gray-700 hover:bg-gray-600"
            } transition`}
            onClick={() => setActiveTab("tasks")}
          >
            Công việc
          </button>
        </div>

        {loading ? (
          <p className="text-center">Đang tải dữ liệu...</p>
        ) : activeTab === "members" ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Danh sách thành viên</h2>
            <ul className="space-y-2">
              {members.map((m) => (
                <li
                  key={m.userId}
                  className="bg-gray-700 p-3 rounded flex justify-between items-center"
                >
                  <span>
                    {m.userName} {m.isLeader && <span className="text-yellow-400">(Nhóm trưởng)</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md hover:shadow-orange-500 transition duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-orange-300">{task.taskTitle}</h3>
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

                {isLeader && (
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white shadow"
                    >
                      Xóa
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
