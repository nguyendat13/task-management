import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7029/api", // Đổi thành URL backend của bạn
  timeout: 10000, // Timeout request sau 10s
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để xử lý lỗi hoặc thêm token nếu có
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage nếu có
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Lỗi API:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
