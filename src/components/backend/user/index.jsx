import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import UserService from "../../../services/UserService.js";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Hook điều hướng

  useEffect(() => {
    fetchUsers();
  }, []);

 const fetchUsers = async () => {
  const data = await UserService.getAllUsers();
  console.log("Dữ liệu API trả về:", data);
  if (data && data.users) {
    setUsers(data.users);
  } else if (Array.isArray(data)) {
    setUsers(data); // Nếu backend trả về danh sách người dùng trực tiếp
  } else {
    console.warn("Không có dữ liệu người dùng phù hợp.");
    setUsers([]);
  }
};

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      await UserService.deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Quản lý người dùng</h1>

      <div className="flex justify-end mb-4">
        <button 
          onClick={() => navigate("/admin/users/create")} 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 flex items-center">
          <FaPlus className="mr-2" /> Thêm người dùng mới
        </button>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-2 px-4 text-left">Họ và tên</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Số điện thoại</th>
            <th className="py-2 px-4 text-left">Địa chỉ</th>

            <th className="py-2 px-4 text-left">Vai trò</th>
            <th className="py-2 px-4 text-left">Hành động</th>
          </tr>
        </thead>
      <tbody>
  {users.length > 0 ? (
    users.map((user) => (
      <tr key={user.id} className="border-b hover:bg-gray-100 hover:text-black">
        <td className="py-2 px-4">{user.name}</td>
        <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.phone}</td>
        <td className="py-2 px-4">{user.address}</td>

        <td className="py-2 px-4">
          {user.roleId === 4 ? "Admin" : user.roleId === 3 ? "User" : "..."}
        </td>
        <td className="py-2 px-4 flex space-x-2">
          <button 
            onClick={() => navigate(`/admin/users/edit/${user.id}`)} 
            className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-700 flex items-center">
            <FaEdit className="mr-1" /> Sửa
          </button>
          <button
            onClick={() => handleDelete(user.id)}
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 flex items-center"
          >
            <FaTrash className="mr-1" /> Xóa
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center py-4 text-gray-500">
        Không có người dùng nào!
      </td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
};

export default UserList;
