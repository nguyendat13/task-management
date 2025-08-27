import React, { useState } from "react";
import GroupItemUserService from "../../../services/GroupItemUserService";
import { getUserIdFromLocalStorage } from "../../../services/utils/auth";
import { useNavigate } from "react-router-dom";

const JoinGroup = () => {
  const [groupCode, setGroupCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userId = getUserIdFromLocalStorage();

  const handleJoin = async () => {
    if (!groupCode.trim()) {
      setMessage("Vui lòng nhập mã nhóm.");
      return;
    }

    try {
  await GroupItemUserService.joinGroupByCode(groupCode, userId);
  setMessage("Yêu cầu tham gia đã được gửi. Vui lòng chờ duyệt.");
  setGroupCode("");
} catch (error) {
  console.error("Lỗi tham gia nhóm:", error);
  setMessage("Không tìm thấy mã nhóm hoặc bạn đã gửi yêu cầu trước đó.");
}

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 px-4">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700">
        <h2 className="text-2xl font-bold text-blue-300 mb-8 text-center">
          Tham gia nhóm bằng mã
        </h2>

        <input
          type="text"
          value={groupCode}
          onChange={(e) => setGroupCode(e.target.value)}
          placeholder="Nhập mã nhóm..."
          className="w-full px-4 py-3 mb-6 rounded-xl bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleJoin}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold shadow transition"
        >
          Tham gia
        </button>

        {message && (
          <p className="mt-6 text-center text-base text-orange-300">{message}</p>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-white transition text-base"
          >
            &larr; Quay lại trang chính
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinGroup;
