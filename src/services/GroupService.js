import axiosInstance from "./axiosHttp";

const GroupService = {
  getAllGroups: async () => {
    try {
      const response = await axiosInstance.get("/Group");
      return response.data;
    } catch (error) {
      console.error("Lỗi getAllGroups:", error.response?.data || error.message);
      return null;
    }
  },

  getGroupById: async (id) => {
    try {
      const response = await axiosInstance.get(`/Group/${id}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi getGroupById:", error.response?.data || error.message);
      return null;
    }
  },
 getGroupsByUserId: async (userId) => {
    try {
      const res = await axiosInstance.get(`/Group/user/${userId}`);
      return res.data;
    } catch (error) {
      console.error("Lỗi lấy nhóm theo userId:", error.response?.data || error.message);
      return [];
    }
  },
  createGroup: async (groupData) => {
    try {
      const response = await axiosInstance.post("/Group", groupData);
      return response.data;
    } catch (error) {
      console.error("Lỗi createGroup:", error.response?.data || error.message);
      return null;
    }
  },

  updateGroup: async (id, groupData) => {
    try {
      const response = await axiosInstance.put(`/Group/${id}`, groupData);
      return response.status === 204; // NoContent
    } catch (error) {
      console.error("Lỗi updateGroup:", error.response?.data || error.message);
      return false;
    }
  },

  deleteGroup: async (id) => {
    try {
      const response = await axiosInstance.delete(`/Group/${id}`);
      return response.status === 204;
    } catch (error) {
      console.error("Lỗi deleteGroup:", error.response?.data || error.message);
      return false;
    }
  }
};

export default GroupService;
