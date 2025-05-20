import axiosInstance from './axiosHttp'; // đường dẫn tới file axiosInstance.js của bạn

export const login = async (loginData) => {
  try {
    const response = await axiosInstance.post('/Auth/login', loginData);
    // Nếu backend trả token trong response, bạn có thể lưu localStorage ở đây:
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  } catch (error) {
    // Xử lý lỗi hoặc throw để component bên trên xử lý
    throw error.response?.data || { message: 'Lỗi đăng nhập' };
  }
};
export const register = async (registerData) => {
  try {
    const response = await axiosInstance.post('/Auth/register', registerData);
    return response.data;
  } catch (error) {
    // ❌ Nếu backend trả message trong object { message }, lấy nó ra
    const errorMessage =
      error.response?.data?.message || // ✅ Lấy message cụ thể nếu có
      error.message ||                 // hoặc dùng message mặc định của Axios
      'Lỗi đăng ký';
    throw { message: errorMessage };   // ✅ ném lỗi đúng dạng
  }
};

