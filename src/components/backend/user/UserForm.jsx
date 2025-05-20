import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../../services/UserService";

const UserForm  = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    username: "",
    password: "",
    roleId: 3,
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Nếu có id => đang sửa

  useEffect(() => {
    if (id) {
      // Mode sửa
      UserService.getUserById(id).then((data) => {
        if (data) {
          setForm({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            username: data.username || "",
            password: "", // Để trống
            roleId: data.roleId || 3,
          });
        }
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
  const payload = { ...form };

  // Nếu đang update và không nhập password mới thì xoá khỏi payload
  if (id && !form.password) {
    delete payload.password;
  }

  if (id) {
    await UserService.updateUser(id, payload);
  } else {
    await UserService.createUser(payload);
  }
    navigate("/admin/users");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">
        {id ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "phone", "address", "username"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        ))}

       { id && (
  <input
    type="password"
    name="password"
    placeholder="Đổi mật khẩu (bỏ trống nếu không đổi)"
    value={form.password}
    onChange={handleChange}
    className="w-full border border-gray-300 p-2 rounded"
  />
)}

        

        <select
          name="roleId"
          value={form.roleId}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value={3}>User</option>
          <option value={4}>Admin</option>
        </select>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {id ? "Cập nhật" : "Thêm"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
