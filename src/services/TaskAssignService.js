import axiosInstance from "./axiosHttp";

const TaskAssignService = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get("/TaskAssignee");
      return response.data;
    } catch (error) {
      console.error("Lỗi getAll TaskAssignee:", error.response?.data || error.message);
      return [];
    }
  },

  getById: async (id) => {
    try {
      const response = await axiosInstance.get(`/TaskAssignee/${id}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi getById TaskAssignee:", error.response?.data || error.message);
      return null;
    }
  },

  getByTaskId: async (taskId) => {
    try {
      const response = await axiosInstance.get(`/TaskAssignee/by-task/${taskId}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi getByTaskId TaskAssignee:", error.response?.data || error.message);
      return [];
    }
  },
};

export default TaskAssignService;
