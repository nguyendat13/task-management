import axiosInstance from "./axiosHttp";

const downloadBlob = (blob, fileName) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
const TaskService = {
  getAllTasks: async () => {
    try {
      const response = await axiosInstance.get("/Task");
      return response.data;
    } catch (error) {
      console.error("Lỗi getAllTasks:", error.response?.data || error.message);
      return null;
    }
  },

  getTaskById: async (id) => {
    try {
      const response = await axiosInstance.get(`/Task/${id}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi getTaskById:", error.response?.data || error.message);
      return null;
    }
  },

  getTasksByUserId: async (userId) => {
    try {
      const response = await axiosInstance.get(`/Task/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi getTasksByUserId:", error.response?.data || error.message);
      return null;
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await axiosInstance.post("/Task", taskData);
      return response.data;
    } catch (error) {
      console.error("Lỗi createTask:", error.response?.data || error.message);
      return null;
    }
  },

  updateTask: async (id, taskData) => {
  try {
    const isFormData = taskData instanceof FormData;

    const response = await axiosInstance.put(
      `/Task/${id}`,
      taskData,
      isFormData
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : undefined // nếu không phải FormData thì dùng mặc định
    );

    return response.status === 200 && response.data === true;
  } catch (error) {
    console.error("Lỗi updateTask:", error.response?.data || error.message);
    return false;
  }
},


  deleteTask: async (id) => {
    try {
      const response = await axiosInstance.delete(`/Task/${id}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi deleteTask:", error.response?.data || error.message);
      return null;
    }
  },
  getAttachmentFile: async (taskId, originalName) => {
  try {
    const response = await axiosInstance.get(`/Task/${taskId}/attachment`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);
    downloadBlob(blob, originalName || "file");
  } catch (error) {
    console.error("Lỗi tải file đính kèm:", error.response?.data || error.message);
    alert("Không thể tải file đính kèm.");
  }
},
getSubmissionFile: async (taskId, originalName) => {
  try {
    const response = await axiosInstance.get(`/Task/${taskId}/submission`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data]);
    downloadBlob(blob, originalName || "file");
  } catch (error) {
    console.error("Lỗi tải file đã nộp:", error.response?.data || error.message);
    alert("Không thể tải file đã nộp.");
  }
},
getFileBlob: async (taskId, type) => {
  try {
    const url =
      type === "attachment"
        ? `/Task/${taskId}/attachment`
        : `/Task/${taskId}/submission`;

    const response = await axiosInstance.get(url, {
      responseType: "blob",
    });

    return response;
  } catch (error) {
    console.error("Lỗi tải blob:", error.response?.data || error.message);
    throw error;
  }
},

};

export default TaskService;
