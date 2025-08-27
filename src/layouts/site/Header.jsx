// Header.jsx
import React from 'react';
import NotificationIcon from './icon/NotificationIcon';
import UserMenu from './icon/UserMenu'; 
import { Link } from 'react-router-dom';
import { getUserIdFromLocalStorage } from '../../services/utils/auth';

const Header = () => {
  const userId = getUserIdFromLocalStorage();

  return (
    <header className="relative z-50 bg-gray-900 border-b border-gray-800 py-3 px-2 shadow-sm">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-300 tracking-tight">Todo Task App</Link>
        <div className="flex items-center space-x-3 text-gray-100">
          <NotificationIcon userId={userId} />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
