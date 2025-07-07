import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GroupItemUserService from "../../../../../services/GroupItemUserService";
import TaskService from "../../../../../services/TaskService";
import WorkProgressService from "../../../../../services/WorkProgressService";
import { getUserIdFromLocalStorage } from "../../../../../services/utils/auth";

const GroupTaskDetail = () => {
  const { groupId, taskId } = useParams();
  const navigate = useNavigate();
  const userId = Number(getUserIdFromLocalStorage());

  const [task, setTask] = useState(null);
  const [progressList, setProgressList] = useState([]);
  const [isLeader, setIsLeader] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [taskId, groupId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [fetchedTask, progress, members] = await Promise.all([
        TaskService.getTaskById(Number(taskId)),
        WorkProgressService.getAll(),
        GroupItemUserService.getUsersByGroupId(groupId)
      ]);

      setTask(fetchedTask);
      setProgressList(progress);

      const currentUser = members.find((m) => m.userId === userId);
      setIsLeader(currentUser?.isLeader || false);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "workProgressId" ? Number(value) : value;

    // Chỉ leader mới được chỉnh các trường khác ngoài workProgressId
  if (!isLeader) {
    // Chỉ cho phép thành viên đổi tiến độ thành 2 (Đang thực hiện) hoặc 3 (Đã hoàn thành)
    if (name !== "workProgressId") return;
    if (![2, 3].includes(newValue)) return;
  }

    setTask((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleUpdate = async () => {
    try {
      const dataToSend = {
        ...task,
        workProgressId: task.workProgressId,
        userId,
        groupId: Number(groupId),
      };

      const success = await TaskService.updateTask(taskId, dataToSend);
      if (success) {
        alert("Cập nhật thành công");
        navigate(`/nhom/${groupId}`);
      } else {
        alert("Cập nhật thất bại");
      }
    } catch (err) {
      console.error("Lỗi cập nhật task:", err);
      alert("Có lỗi xảy ra khi cập nhật task.");
    }
  };

  if (loading) return <p className="text-center text-white mt-6">Đang tải dữ liệu...</p>;
  if (!task) return <p className="text-center text-white mt-6">Không tìm thấy công việc.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 text-white p-6 rounded-lg mt-10 shadow-lg">
      <h2 className="text-2xl font-bold text-orange-400 mb-4">Chi tiết công việc nhóm</h2>

      <label className="block mt-3 text-sm">Tiêu đề:</label>
      <input
        type="text"
        name="title"
        value={task.title || ""}
        onChange={handleChange}
        disabled={!isLeader}
        className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
      />

      <label className="block mt-3 text-sm">Mô tả:</label>
      <textarea
        name="description"
        value={task.description || ""}
        onChange={handleChange}
        disabled={!isLeader}
        className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
      />

      <label className="block mt-3 text-sm">Chi tiết:</label>
      <textarea
        name="detail"
        value={task.detail || ""}
        onChange={handleChange}
        disabled={!isLeader}
        rows={4}
        className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
      />

      <label className="block mt-3 text-sm">Hạn chót:</label>
      <input
        type="datetime-local"
        name="dueDate"
        value={task.dueDate?.slice(0, 16) || ""}
        onChange={handleChange}
        disabled={!isLeader}
        className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
      />

      <label className="block mt-3 text-sm">Tiến độ:</label>
      <select
        name="workProgressId"
        value={task.workProgressId || ""}
        onChange={handleChange}
        className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded"
      >
        {(isLeader 
          ? progressList
          : progressList.filter(p => [2, 3].includes(p.id)) // chỉ cho phép id 2 và 3 cho member
        ).map((p) => (
          <option key={p.id} value={p.id}>
            {p.status}
          </option>
        ))}
      </select>

      <div className="flex justify-end mt-6 space-x-2">
        <button
          onClick={() => navigate(`/nhom/${groupId}`)}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white"
        >
          Quay lại
        </button>
        <button
          onClick={handleUpdate}
          className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-white"
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default GroupTaskDetail;
