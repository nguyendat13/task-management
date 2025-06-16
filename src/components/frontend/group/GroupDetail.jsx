import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GroupItemUserService from "../../../services/GroupItemUserService";
import GroupItemTaskService from "../../../services/GroupItemTaskService";
import WorkProgressService from "../../../services/WorkProgressService";
import GroupService from "../../../services/GroupService";
import { getUserIdFromLocalStorage } from "../../../services/utils/auth";

const GroupDetail = () => {
  const { id: groupId } = useParams();
  const navigate = useNavigate();
  const currentUserId = getUserIdFromLocalStorage();

  const [activeTab, setActiveTab] = useState("members");
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const [groupInfo, setGroupInfo] = useState(null);
  const [isLeader, setIsLeader] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [groupId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [userRes, taskRes, progressRes, groupRes] = await Promise.all([
        GroupItemUserService.getUsersByGroupId(groupId),
        GroupItemTaskService.getTasksByGroupId(groupId),
        WorkProgressService.getAll(),
        GroupService.getGroupById(groupId),
      ]);

      setMembers(userRes || []);
      setTasks(taskRes || []);
      setProgressList(progressRes || []);
      setGroupInfo(groupRes?.data || groupRes);

      const currentUser = userRes?.find((u) => u.userId === Number(currentUserId));
      
      setIsLeader(currentUser?.isLeader || false);
      
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
    setLoading(false);
  };

  const getProgressStatus = (id) => {
    return progressList.find((p) => p.id === id)?.status || "Không rõ";
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Bạn có chắc muốn xoá công việc này?")) {
      const success = await GroupItemTaskService.deleteGroupTask(taskId);
      if (success) setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const handleAssignLeader = async (newLeaderId) => {
    if (window.confirm("Bạn có chắc muốn ủy quyền nhóm trưởng cho người này không?")) {
      try {
        await GroupItemUserService.assignLeader(groupId, newLeaderId);
        alert("Đã ủy quyền nhóm trưởng.");
        fetchData();
      } catch {
        alert("Lỗi khi ủy quyền.");
      }
    }
  };

  const handleRemoveMember = async (userId) => {
    if (window.confirm("Bạn có chắc muốn xoá thành viên này không?")) {
      try {
        const success = await GroupItemUserService.removeMember(groupId, userId);
        if (success) {
          alert("Đã xóa thành viên.");
          fetchData();
        }
      } catch {
        alert("Lỗi khi xoá.");
      }
    }
  };

  const handleAddMember = async () => {
    const identifier = prompt("Nhập email hoặc tên đăng nhập:");
    if (identifier) {
      try {
        await GroupItemUserService.addMemberByEmailOrUsername(groupId, identifier);
        alert("Đã thêm thành viên.");
        fetchData();
      } catch {
        alert("Lỗi khi thêm thành viên.");
      }
    }
  };

  const handleLeaveGroup = async () => {
    if (isLeader) {
      return alert("Bạn là nhóm trưởng. Vui lòng ủy quyền cho người khác trước khi rời nhóm.");
    }
    if (window.confirm("Bạn có chắc muốn rời khỏi nhóm này không?")) {
      try {
        const success = await GroupItemUserService.removeMember(groupId, currentUserId);
        if (success) {
          alert("Bạn đã rời nhóm.");
          navigate("/danh-sach-nhom");
        }
      } catch {
        alert("Lỗi khi rời nhóm.");
      }
    }
  };

  return (
    <div className="min-h-screen text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">
       <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => navigate("/danh-sach-nhom")}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow transition"
        >
          &larr; Quay lại
        </button>

        <button
          onClick={handleLeaveGroup}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow"
        >
          Rời nhóm
        </button>
      </div>


        <div className="flex justify-between mt-4">
          {isLeader && (
            <button
              onClick={handleAddMember}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
            >
              + Thêm thành viên
            </button>
          )}
         
        </div>

        <h1 className="text-3xl font-bold text-orange-400 mb-8 text-center">
          Chi tiết nhóm
        </h1>

        {groupInfo && (
          <p className="text-center text-gray-300 mb-6">
            Mã nhóm:{" "}
            <span className="text-white font-semibold">{groupInfo.groupCode}</span>{" "}
            - Tên nhóm:{" "}
            <span className="text-white font-semibold">{groupInfo.name}</span>
          </p>
        )}

        <div className="flex justify-center mb-8 gap-6">
          {["members", "tasks"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded ${
                activeTab === tab ? "bg-orange-500" : "bg-gray-700 hover:bg-gray-600"
              } transition`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "members" ? "Thành viên" : "Công việc"}
            </button>
          ))}
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
                    {m.userName}{" "}
                    {m.isLeader && <span className="text-yellow-400">(Nhóm trưởng)</span>}
                  </span>
                {isLeader ? (
                    currentUserId !== m.userId && (
                      
                      <div className="space-x-2">
                        <button
                          onClick={() => handleAssignLeader(m.userId)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Ủy quyền
                        </button>
                        <button
                          onClick={() => handleRemoveMember(m.userId)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Xóa
                        </button>
                      </div>
                    )
                  ) : null}

                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            {isLeader && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => navigate(`/nhom/${groupId}/them-cong-viec`)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded shadow"
                >
                  + Thêm công việc
                </button>
              </div>
            )}

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
          </>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;
