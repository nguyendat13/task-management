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
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
      >
        <h2 className="text-2xl text-orange-400 font-bold text-center">
          Thêm công việc {groupId ? "trong nhóm" : "mới"}
        </h2>

        <input
          name="title"
          placeholder="Tiêu đề"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-600 bg-gray-900 text-white"
          required
        />
        <input
          name="description"
          placeholder="Mô tả ngắn"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 rounded border border-gray-600 bg-gray-900 text-white"
        />
        <textarea
          name="detail"
          placeholder="Chi tiết"
          value={form.detail}
          onChange={handleChange}
          rows={5}
          className="w-full p-3 rounded border border-gray-600 bg-gray-900 text-white"
        />

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-1 text-gray-300">Ngày</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              min={today}
              required
              className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-gray-300">Giờ</label>
            <input
              type="time"
              name="dueTime"
              value={form.dueTime}
              onChange={handleChange}
              required
              className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
            />
          </div>
        </div>


      {/* 👇 Chọn người được giao nhiệm vụ */}
        {groupId && (
          <div>
            <label className="block mb-1 text-gray-300">Giao cho:</label>
            <select
              name="assigneeId"
              value={form.assigneeId}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-white"
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
          <label className="block mb-1 text-gray-300">Tệp đính kèm:</label>
          <input
            type="file"
            name="attachment"
            accept=".pdf,.doc,.docx,.xlsx,.xls,.png,.jpg,.jpeg,.txt,.sql"
            onChange={handleChange}
            className="text-white"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-600 px-5 py-2 rounded hover:bg-gray-700 text-white"
          >
            Quay lại
          </button>
          <button
            type="submit"
            className="bg-orange-500 px-5 py-2 rounded hover:bg-orange-600 text-white font-semibold"
          >
            Tạo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGroupTask;
