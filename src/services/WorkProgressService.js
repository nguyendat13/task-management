import axiosInstance from "./axiosHttp";

const WorkProgressService = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get("/WorkProgress");
      return response.data;
    } catch (error) {
      console.error("Lỗi getAll WorkProgress:", error.response?.data || error.message);
      return [];
    }
  },
};

export default WorkProgressService;
