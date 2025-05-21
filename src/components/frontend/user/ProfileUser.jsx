import { jwtDecode } from "jwt-decode";

const ProfileUser = () => {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Nền gradient mờ */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-purple-200 to-pink-200 opacity-10 z-0" />

      {/* Khối nội dung chính */}
      <div className="relative z-10 bg-white shadow-xl rounded-2xl p-10 max-w-md w-full backdrop-blur-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">Trang cá nhân</h2>
          <p className="text-gray-500 mt-1">Thông tin tài khoản của bạn</p>
        </div>

        {user ? (
          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Username:</span>
              <span>{user.sub || "Không có"}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Email:</span>
              <span>{user.email || "Không có"}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Số điện thoại:</span>
              <span>{user.phone || "Không có"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Địa chỉ:</span>
              <span>{user.address || "Không có"}</span>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-600 font-medium">
            Không có thông tin người dùng.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileUser;
