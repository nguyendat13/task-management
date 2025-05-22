import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
const userId = urlParams.get('userId');
const email = urlParams.get('email');


 useEffect(() => {
  if (token && userId && email) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("email", email);
    navigate("/ho-so");
  } else {
    navigate("/dang-nhap");
  }
}, [token, userId, email, navigate]);

  return (
    <div>
      <h3>Đang xử lý đăng nhập...</h3>
    </div>
  );
};

export default GoogleSuccess;