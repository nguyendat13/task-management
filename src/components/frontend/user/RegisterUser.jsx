import React, { useState } from 'react';
import { register } from '../../../services/AuthService';
import { useNavigate, Link } from 'react-router-dom';

function RegisterUser() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      await register({ name: fullname, email, username, password, address, phone });
      setSuccess('Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.');

      setTimeout(() => {
        navigate('/dang-nhap');
      }, 2000);
    } catch (err) {
      console.error('Lỗi đăng ký:', err);
      setError(err.message || 'Lỗi đăng ký');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl w-full max-w-md p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Tạo tài khoản mới
        </h2>

        <div className="space-y-4">
          <Input label="Họ và tên" value={fullname} onChange={setFullname} required />
          <Input label="Email" type="email" value={email} onChange={setEmail} required />
          <Input label="Username" value={username} onChange={setUsername} required />
          <Input label="Mật khẩu" type="password" value={password} onChange={setPassword} required />
          <Input label="Xác nhận mật khẩu" type="password" value={confirmPassword} onChange={setConfirmPassword} required />
          <Input label="Địa chỉ (không bắt buộc)" value={address} onChange={setAddress} />
          <Input label="Số điện thoại (không bắt buộc)" value={phone} onChange={setPhone} />
        </div>

        {error && <p className="mt-4 text-red-600 text-sm text-center">{error}</p>}
        {success && <p className="mt-4 text-green-600 text-sm text-center">{success}</p>}

        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition"
        >
          Đăng ký
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <Link to="/dang-nhap" className="text-indigo-600 font-medium hover:underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
}

// 🔧 Component phụ tá để tái sử dụng Input
function Input({ label, value, onChange, type = 'text', required = false }) {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder={`Nhập ${label.toLowerCase()}`}
      />
    </div>
  );
}

export default RegisterUser;
