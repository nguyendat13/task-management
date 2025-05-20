import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faSignInAlt,
  faSignOutAlt,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

const UserMenu = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userMenuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowUserMenu(false);
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {isLoggedIn ? (
        <>
          <button ref={buttonRef} onClick={toggleUserMenu} className="focus:outline-none">
            <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
          </button>

          {showUserMenu && (
            <div
              ref={userMenuRef}
              className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg border z-50"
            >
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Bảng điều khiển</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Công việc</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Báo cáo</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Cài đặt</a>
              <hr />
              <a onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Đăng xuất
              </a>
            </div>
          )}
        </>
      ) : (
        <a href="/dang-nhap">
          <FontAwesomeIcon icon={faSignInAlt} className="w-6 h-6 cursor-pointer" />
        </a>
      )}
    </div>
  );
};

export default UserMenu;
