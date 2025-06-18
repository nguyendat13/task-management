// Header.jsx
import React from 'react';
import NotificationIcon from './icon/NotificationIcon';
import UserMenu from './icon/UserMenu'; 
import { Link } from 'react-router-dom';
import { getUserIdFromLocalStorage } from '../../services/utils/auth';

const Header = () => {
  const userId = getUserIdFromLocalStorage();

  return (
    <header className="relative z-50 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-4xl font-bold text-center w-full">Quản lý công việc</Link>
        <div className="flex items-center space-x-4">
          <NotificationIcon userId={userId} />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
