import axiosInstance from "./axiosHttp";

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
      const response = await axiosInstance.put(`/Task/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error("Lỗi updateTask:", error.response?.data || error.message);
      return null;
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
};

export default TaskService;
