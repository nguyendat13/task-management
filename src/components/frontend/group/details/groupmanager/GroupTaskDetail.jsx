import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GroupItemUserService from "../../../../../services/GroupItemUserService";
import TaskService from "../../../../../services/TaskService";
import WorkProgressService from "../../../../../services/WorkProgressService";
import { getUserIdFromLocalStorage } from "../../../../../services/utils/auth";
import TaskAssignService from "../../../../../services/TaskAssignService";
const GroupTaskDetail = () => {
  const { groupId, taskId } = useParams();
  const navigate = useNavigate();
  const userId = Number(getUserIdFromLocalStorage());
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewFileName, setPreviewFileName] = useState("");

  const [task, setTask] = useState(null);
  const [progressList, setProgressList] = useState([]);
  const [isLeader, setIsLeader] = useState(false);
  const [loading, setLoading] = useState(true);

  const [assignees, setAssignees] = useState([]);
  const [isAssignee, setIsAssignee] = useState(false);

  useEffect(() => {
  fetchData();
}, [taskId, groupId]);

const fetchData = async () => {
  setLoading(true);
  try {
    const [fetchedTask, progress, members, taskAssignees] = await Promise.all([
      TaskService.getTaskById(Number(taskId)),
      WorkProgressService.getAll(),
      GroupItemUserService.getUsersByGroupId(groupId),
      TaskAssignService.getByTaskId(taskId), // ✅ đúng thứ tự và gọi API
    ]);

    setTask(fetchedTask);
    setProgressList(progress);
    setAssignees(taskAssignees); // ✅ lưu lại danh sách assignee

    const currentUser = members.find((m) => m.userId === userId);
    setIsLeader(currentUser?.isLeader || false);

    const isAssigned = taskAssignees.some((a) => a.userId === userId); // ✅ userId hiện tại có trong assignee
    setIsAssignee(isAssigned);
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
    const formData = new FormData();
    formData.append("title", task.title);
    formData.append("description", task.description || "");
    formData.append("detail", task.detail || "");
    formData.append("dueDate", task.dueDate || "");
    formData.append("userId", userId);
    formData.append("groupId", groupId || "");
    formData.append("workProgressId", task.workProgressId);

    if (task.attachment) formData.append("attachment", task.attachment);
    if (task.submissionFile) formData.append("submissionFile", task.submissionFile);

    const success = await TaskService.updateTask(taskId, formData);
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
const handlePreviewFile = async (type) => {
  try {
    const response = await TaskService.getFileBlob(task.id, type);
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    const fileName =
      type === "attachment" ? task.attachmentOriginalName : task.submissionOriginalName;

    if (!fileName || !url) throw new Error("Không thể xem trước file");

    setPreviewUrl(url);
    setPreviewFileName(fileName);
  } catch (error) {
    setPreviewUrl(null); // Clear preview
    setPreviewFileName("");
    console.error("Không thể xem tệp:", error);
    alert("Không thể xem trước tệp. Bạn có thể tải về thay thế.");
  }
};



  if (loading) return <p className="text-center text-white mt-6">Đang tải dữ liệu...</p>;
  if (!task) return <p className="text-center text-white mt-6">Không tìm thấy công việc.</p>;

  return (
  <div className="max-w-2xl mx-auto bg-gray-900 text-gray-100 p-8 rounded-2xl mt-10 shadow-2xl border border-gray-800">
  <h2 className="text-2xl font-bold text-blue-300 mb-8 text-center">Chi tiết công việc nhóm</h2>

      <label className="block mt-3 text-sm font-medium">Tiêu đề:</label>
      <input
        type="text"
        name="title"
        value={task.title || ""}
        onChange={handleChange}
        disabled={!isLeader}
        className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div className="mt-2 text-sm text-gray-300">
        <span className="font-semibold text-gray-100">Thành viên được giao:</span>{" "}
        {assignees.length > 0 ? (
          assignees.map((a) => a.name).join(", ")
        ) : (
          <span className="italic text-gray-400">Chưa có</span>
        )}
      </div>

      <label className="block mt-3 text-sm font-medium">Mô tả:</label>
      <textarea
        name="description"
        value={task.description || ""}
        onChange={handleChange}
        disabled={!isLeader}
        className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block mt-3 text-sm font-medium">Chi tiết:</label>
      <textarea
        name="detail"
        value={task.detail || ""}
        onChange={handleChange}
        disabled={!isLeader}
        rows={4}
        className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

          {isLeader && (
        <>
          <label className="block mt-3 text-sm font-medium">Tệp đính kèm (nhóm trưởng tải lên):</label>
          <input
            type="file"
            name="attachment"
            onChange={(e) =>
              setTask((prev) => ({ ...prev, attachment: e.target.files[0] }))
            }
            className="text-gray-100 file:bg-blue-600 file:text-white file:rounded-lg file:px-3 file:py-1 file:border-0"
          />
        </>
      )}
      <button
        onClick={() =>
          task.attachmentPath
            ? handlePreviewFile("attachment")
            : alert("Không có tệp đính kèm để xem.")
        }
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mt-2 shadow"
      >
        📎 Xem tệp đính kèm
      </button>



      <label className="block mt-3 text-sm font-medium">Hạn chót:</label>
      <input
        type="datetime-local"
        name="dueDate"
        value={task.dueDate?.slice(0, 16) || ""}
        onChange={handleChange}
        disabled={!isLeader}
        className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block mt-3 text-sm font-medium">Tiến độ:</label>
      <select
        name="workProgressId"
        value={task.workProgressId || ""}
        onChange={handleChange}
        disabled={!isLeader && !isAssignee}
        className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {progressList.map((p) => {
    // Nếu không phải leader => chỉ cho chọn tiến độ 2 hoặc 3
    if (!isLeader && ![2, 3].includes(p.id)) return null;
    return (
      <option key={p.id} value={p.id}>
        {p.status}
      </option>
    );
  })}
      </select>

     {isAssignee && (
      <>
        <label className="block mt-3 text-sm font-medium">Nộp bài (dành cho người được giao):</label>
        <input
          type="file"
          name="submission"
          onChange={(e) =>
            setTask((prev) => ({ ...prev, submission: e.target.files[0] }))
          }
          className="text-gray-100 file:bg-green-600 file:text-white file:rounded-lg file:px-3 file:py-1 file:border-0"
        />
      </>
    )}

      <button
        onClick={() =>
          task.submissionFilePath
            ? handlePreviewFile("submission")
            : alert("Không có bài nộp để xem.")
        }
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mt-2 shadow"
      >
        📄 Xem bài nộp
      </button>

    {previewUrl && previewFileName && (
      <div className="mt-8 bg-gray-800 p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-gray-100 font-semibold">Xem trước tệp: {previewFileName}</h3>
          <a
            href={previewUrl}
            download={previewFileName}
            className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-lg text-sm"
          >
            Tải xuống
          </a>
        </div>

        {/\.(pdf)$/i.test(previewFileName) ? (
          <iframe
            src={previewUrl}
            title="Preview PDF"
            className="w-full h-[500px] border rounded-xl"
          />
        ) : /\.(png|jpg|jpeg|gif)$/i.test(previewFileName) ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full h-auto rounded-xl border"
          />
        ) : (
          <div className="text-gray-300 italic">
            Không hỗ trợ xem trước định dạng này. Vui lòng tải về để xem.
          </div>
        )}
      </div>
    )}

      <div className="flex justify-end mt-8 space-x-3">
        <button
          onClick={() => navigate(`/nhom/${groupId}`)}
          className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-lg text-white shadow"
        >
          Quay lại
        </button>
        <button
          onClick={handleUpdate}
          className="bg-orange-600 hover:bg-orange-700 px-5 py-2 rounded-lg text-white shadow font-semibold"
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default GroupTaskDetail;
