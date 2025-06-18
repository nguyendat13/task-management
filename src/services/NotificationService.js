import axiosInstance from "./axiosHttp";

const NotificationService = {
  getUserNotifications: async (userId) => {
    try {
      const res = await axiosInstance.get(`/Notification/user/${userId}`);
      return res.data;
    } catch (error) {
      console.error("Lỗi getNotificationsByUserId:", error.response?.data || error.message);
      return [];
    }
  },

 markAsRead: async (notificationId) => {
    try {
      const res = await axiosInstance.put(`/Notification/${notificationId}/read`);
      return res.data;
    } catch (error) {
      console.error("Lỗi markAsRead:", error.response?.data || error.message);
      return null;
    }
  },

  acceptInvite: async (notificationId) => {
    try {
      const res = await axiosInstance.post(`/Notification/${notificationId}/accept`);
      return res.data;
    } catch (error) {
      console.error("Lỗi acceptInvite:", error.response?.data || error.message);
      return null;
    }
  },

  rejectInvite: async (notificationId) => {
    try {
      const res = await axiosInstance.post(`/Notification/${notificationId}/reject`);
      return res.data;
    } catch (error) {
      console.error("Lỗi rejectInvite:", error.response?.data || error.message);
      return null;
    }
  },
};

export default NotificationService;
