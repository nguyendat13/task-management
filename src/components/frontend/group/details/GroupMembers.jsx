import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GroupItemUserService from "../../../../services/GroupItemUserService";
import { getUserIdFromLocalStorage } from "../../../../services/utils/auth";

const GroupMembers = () => {
  const { id: groupId } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentUserId = getUserIdFromLocalStorage();

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const result = await GroupItemUserService.getUsersByGroupId(groupId);
        setMembers(result || []);
      } catch (error) {
        console.error("Lỗi tải thành viên:", error);
      }
      setLoading(false);
    };
    fetchMembers();
  }, [groupId]);

  if (loading) return <p className="text-white text-center mt-10">Đang tải dữ liệu...</p>;

  if (!members || members.length === 0)
    return <p className="text-white text-center mt-10">Không có thành viên nào.</p>;

  return (
    <div className="relative min-h-screen text-white">
      <div className="max-w-5xl mx-auto py-12 px-6">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow transition"
          >
            &larr; Quay lại
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-orange-400 mb-8">
          Danh sách thành viên
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {members.map((member) => (
            <div
              key={member.userId}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md hover:shadow-orange-500 transition duration-300"
            >
              <h3 className="text-xl font-semibold text-orange-300">{member.userName}</h3>
              <p className="text-gray-400 mt-2">
                Vai trò:{" "}
                <span className={member.isLeader ? "text-yellow-400" : "text-green-400"}>
                  {member.isLeader ? "Nhóm trưởng" : "Thành viên"}
                </span>
              </p>
              {member.userId === currentUserId && (
                <p className="mt-2 text-sm text-blue-300 italic">Bạn</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupMembers;
