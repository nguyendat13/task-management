import React, { useEffect, useState } from "react";
import GroupService from "../../../services/GroupService";
import GroupItemUserService from "../../../services/GroupItemUserService";
import { getUserIdFromLocalStorage } from "../../../services/utils/auth";
import { useNavigate } from "react-router-dom";

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = parseInt(getUserIdFromLocalStorage(), 10); // ép kiểu number 1 lần duy nhất

  useEffect(() => {
    const fetchGroups = async () => {
      if (!userId) return;

      try {
        const groupsData = await GroupService.getGroupsByUserId(userId);

        const enrichedGroups = await Promise.all(
          (groupsData || []).map(async (group) => {
            const members = await GroupItemUserService.getUsersByGroupId(group.id);

            const currentUser = members?.find(
              (m) => Number(m.userId) === userId
            );

            const isLeader = currentUser?.isLeader || false;

            return {
              ...group,
              isLeader,
            };
          })
        );

        setGroups(enrichedGroups);
      } catch (error) {
        console.error("Lỗi khi tải danh sách nhóm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [userId]);

  const handleDeleteGroup = async (groupId) => {
    const group = groups.find((g) => g.id === groupId);
    if (!group?.isLeader) {
      alert("Chỉ trưởng nhóm mới có quyền xóa nhóm này.");
      return;
    }

    const confirm = window.confirm("Bạn có chắc muốn xóa nhóm này?");
    if (!confirm) return;

    try {
      const success = await GroupService.deleteGroup(groupId, userId);
      if (success) {
        setGroups(groups.filter((g) => g.id !== groupId));
        alert("Xóa nhóm thành công.");
      } else {
        alert("Xóa nhóm thất bại hoặc bạn không có quyền.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa nhóm:", error);
      alert("Xóa nhóm thất bại.");
    }
  };

  if (loading)
    return <p className="text-white text-center mt-10">Đang tải danh sách nhóm...</p>;

  if (groups.length === 0)
    return <p className="text-white text-center mt-10">Bạn chưa tham gia nhóm nào.</p>;

  return (
    <div className="relative min-h-screen text-white">
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
          Danh sách nhóm của bạn
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md hover:shadow-orange-500 transition duration-300"
            >
              <h3 className="text-xl font-semibold text-orange-300 mb-2">{group.name}</h3>
              <p className="text-gray-300 mb-4">{group.duty || "Không có mô tả."}</p>

              <div className="text-sm text-gray-400 space-y-1">
                <p>
                  <span className="text-gray-500">Ngày tạo:</span>{" "}
                  {new Date(group.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="text-gray-500">Số công việc:</span>{" "}
                  {group.taskTitles?.length || 0}
                </p>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/nhom/${group.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white shadow"
                >
                  Xem chi tiết
                </button>

                <button
                  onClick={() => handleDeleteGroup(group.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white shadow"
                >
                  Xóa nhóm
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupList;
