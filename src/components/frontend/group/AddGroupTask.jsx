import React, { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskService from "../../../services/TaskService";
import { getUserIdFromLocalStorage } from "../../../services/utils/auth";
import GroupItemUserService from "../../../services/GroupItemUserService";

const AddGroupTask = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const userId = getUserIdFromLocalStorage();


  const [form, setForm] = useState({
    title: "",
    description: "",
    detail: "",
    dueDate: "",
    dueTime: "12:00",
    attachment: null, // 👈 thêm tệp
    assigneeId: "",
  });
 const [groupMembers, setGroupMembers] = useState([]);

  // 🔁 Lấy danh sách thành viên nhóm
  useEffect(() => {
    const fetchMembers = async () => {
      if (groupId) {
        const members = await GroupItemUserService.getUsersByGroupId(groupId);
        if (members) setGroupMembers(members);
      }
    };
    fetchMembers();
  }, [groupId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setForm({ ...form, attachment: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Không tìm thấy userId, vui lòng đăng nhập lại!");
      navigate("/dang-nhap");
      return;
    }

    const dueDateTime =
      form.dueDate && form.dueTime
        ? `${form.dueDate}T${form.dueTime}:00`
        : null;

    // 👇 Tạo formData để gửi kèm file
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("detail", form.detail);
    formData.append("dueDate", dueDateTime);
    formData.append("userId", parseInt(userId));
    formData.append("workProgressId", 1);
    if (groupId) formData.append("groupId", parseInt(groupId));
    if (form.attachment) formData.append("attachment", form.attachment);
    if (form.assigneeId) formData.append("assigneeId", form.assigneeId);
    try {
      await TaskService.createTask(formData);
      alert("Thêm công việc thành công!");
      navigate(groupId ? `/nhom/${groupId}` : "/danh-sach-cong-viec");
    } catch (error) {
      alert("Thêm công việc thất bại!");
      console.error(error);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-10 rounded-2xl shadow-2xl max-w-lg w-full space-y-7 border border-gray-700"
      >
        <h2 className="text-2xl text-blue-300 font-bold text-center mb-4">
          Thêm công việc {groupId ? "trong nhóm" : "mới"}
        </h2>

        <input
          name="title"
          placeholder="Tiêu đề"
          value={form.title}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="description"
          placeholder="Mô tả ngắn"
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="detail"
          placeholder="Chi tiết"
          value={form.detail}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-1 text-gray-300 font-medium">Ngày</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              min={today}
              required
              className="w-full px-3 py-2 rounded-xl border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-300 font-medium">Giờ</label>
            <input
              type="time"
              name="dueTime"
              value={form.dueTime}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-xl border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 👇 Chọn người được giao nhiệm vụ */}
        {groupId && (
          <div>
            <label className="block mb-1 text-gray-300 font-medium">Giao cho:</label>
            <select
              name="assigneeId"
              value={form.assigneeId}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Chọn thành viên --</option>
              {groupMembers.map((member) => (
                <option key={member.userId} value={member.userId}>
                  {member.userName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 👇 Tệp đính kèm */}
        <div>
          <label className="block mb-1 text-gray-300 font-medium">Tệp đính kèm:</label>
          <input
            type="file"
            name="attachment"
            accept=".pdf,.doc,.docx,.xlsx,.xls,.png,.jpg,.jpeg,.txt,.sql"
            onChange={handleChange}
            className="text-gray-100 file:bg-blue-600 file:text-white file:rounded-lg file:px-3 file:py-1 file:border-0"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-xl text-white shadow"
          >
            Quay lại
          </button>
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-xl text-white font-semibold shadow"
          >
            Tạo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGroupTask;
