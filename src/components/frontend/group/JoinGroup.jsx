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
      setMessage("Tham gia nhóm thành công!");
      setTimeout(() => navigate("/danh-sach-nhom"), 1500); // chuyển sau 1.5s
    } catch (error) {
      console.error("Lỗi tham gia nhóm:", error);
      setMessage("Không tìm thấy mã nhóm hoặc bạn đã tham gia nhóm này.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-orange-400 mb-6 text-center">
          Tham gia nhóm bằng mã
        </h2>

        <input
          type="text"
          value={groupCode}
          onChange={(e) => setGroupCode(e.target.value)}
          placeholder="Nhập mã nhóm..."
          className="w-full px-4 py-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          onClick={handleJoin}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition"
        >
          Tham gia
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-orange-300">{message}</p>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-white transition"
          >
            &larr; Quay lại trang chính
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinGroup;
