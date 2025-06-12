import axiosInstance from "./axiosHttp";

const GroupItemTaskService = {
  getTasksByGroupId: async (groupId) => {
    try {
      const res = await axiosInstance.get(`/GroupItemTask/group/task/${groupId}`);
      return res.data;
    } catch (error) {
      console.error("Lỗi getTasksByGroupId:", error.response?.data || error.message);
      return null;
    }
  },

  createGroupTask: async (data) => {
    try {
      const res = await axiosInstance.post(`/GroupItemTask`, data); // Bạn phải có endpoint POST này ở backend
      return res.data;
    } catch (error) {
      console.error("Lỗi createGroupTask:", error.response?.data || error.message);
      return null;
    }
  },

  deleteGroupTask: async (id) => {
    try {
      const res = await axiosInstance.delete(`/GroupItemTask/${id}`);
      return res.status === 204;
    } catch (error) {
      console.error("Lỗi deleteGroupTask:", error.response?.data || error.message);
      return false;
    }
  },
};

export default GroupItemTaskService;
