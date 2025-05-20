import axiosInstance from "./axiosHttp";

const UserService = {
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get("/User");
      return response.data;
    } catch (error) {
      return null;
    }
  },

  getUserById: async (id) => {
    try {
      const response = await axiosInstance.get(`/User/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axiosInstance.post("/User", userData);
      return response.data;
    } catch (error) {
      return null;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await axiosInstance.put(`/User/${id}`, userData);
      return response.data;
    } catch (error) {
      return null;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await axiosInstance.delete(`/User/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  },
};

export default UserService;
