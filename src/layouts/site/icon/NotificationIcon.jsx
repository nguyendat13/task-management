import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const NotificationIcon = ({ count = 0 }) => {
  return (
    <div className="relative">
      <FontAwesomeIcon icon={faBell} className="w-6 h-6 cursor-pointer" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full animate-bounce">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;
