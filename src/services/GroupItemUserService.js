import axiosInstance from "./axiosHttp";

const GroupItemUserService = {
  getUsersByGroupId: async (groupId) => {
    try {
      const res = await axiosInstance.get(`/GroupItemUser/group/user/${groupId}`);
      return res.data;
    } catch (error) {
      console.error("Lỗi getUsersByGroupId:", error.response?.data || error.message);
      return null;
    }
  },

 joinGroupByCode: async (groupCode, userId) => {
  try {
    const res = await axiosInstance.post("/GroupItemUser/join", {
      groupCode,
      userId,
      isLeader: false,
    });
    return res.data;
  } catch (error) {
    console.error("Lỗi joinGroupByCode:", error.response?.data || error.message);
    throw error;
  }
},


  leaveGroup: async (groupId, userId) => {
    try {
      const res = await axiosInstance.delete(`/GroupItemUser/leave?groupId=${groupId}&userId=${userId}`);
      return res.status === 204;
    } catch (error) {
      console.error("Lỗi leaveGroup:", error.response?.data || error.message);
      return false;
    }
  },
};

export default GroupItemUserService;
