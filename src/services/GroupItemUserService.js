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
  // Ủy quyền nhóm trưởng
  assignLeader: async (groupId, newLeaderId) => {
    try {
      const res = await axiosInstance.post(
        `/GroupItemUser/${groupId}/assign-leader`,
        { newLeaderId }
      );
      return res.data;
    } catch (error) {
      console.error("Lỗi assignLeader:", error.response?.data || error.message);
      throw error;
    }
  },

  // Xoá thành viên
  removeMember: async (groupId, userId) => {
    try {
      const res = await axiosInstance.delete(
        `/GroupItemUser/${groupId}/remove/${userId}`
      );
      return res.status === 200;
    } catch (error) {
      console.error("Lỗi removeMember:", error.response?.data || error.message);
      return false;
    }
  },

  // ✅ Thêm thành viên bằng username hoặc email
  addMemberByEmailOrUsername: async (groupId, identifier) => {
    try {
      const res = await axiosInstance.post(`/GroupItemUser/add-by-email-or-username`, {
        groupId,
        emailOrUsername: identifier,
      });
      return res.data;
    } catch (error) {
      console.error("Lỗi addMemberByEmailOrUsername:", error.response?.data || error.message);
      throw error;
    }
  },

};

export default GroupItemUserService;
