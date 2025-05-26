export const getUserIdFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const base64Payload = token.split('.')[1]; // phần payload ở giữa
    const payload = atob(base64Payload); // giải mã base64
    const parsedPayload = JSON.parse(payload);
    return parsedPayload.userId || parsedPayload.sub || parsedPayload.nameid || null;
  } catch (err) {
    console.error("Lỗi khi decode token:", err);
    return null;
  }
};
