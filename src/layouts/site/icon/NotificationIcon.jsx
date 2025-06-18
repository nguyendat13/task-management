import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import NotificationService from '../../../services/NotificationService';

// 👉 Enum map để chuyển số → tên
const NotificationTypeMap = {
  0: "InviteToGroup",
  1: "TaskAssigned",
  2: "Message",
  3: "Other"
};

const NotificationStatusMap = {
  0: "Pending",
  1: "Accepted",
  2: "Rejected",
  3: "None"
};

const NotificationIcon = ({ userId }) => {
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showList, setShowList] = useState(false);

  const fetchNotifications = async () => {
    try {
      const result = await NotificationService.getUserNotifications(userId);
      if (Array.isArray(result)) {
        setNotifications(result);
        const unreadCount = result.filter(n => !n.wasRead).length;
        setCount(unreadCount);
      } else {
        setNotifications([]);
        setCount(0);
      }
    } catch (error) {
      console.error("Lỗi khi tải thông báo:", error);
      setNotifications([]);
      setCount(0);
    }
  };

  const handleAccept = async (notificationId) => {
    await NotificationService.acceptInvite(notificationId);
    fetchNotifications();
  };

  const handleReject = async (notificationId) => {
    await NotificationService.rejectInvite(notificationId);
    fetchNotifications();
  };

  const handleMarkAsRead = async (notificationId) => {
    await NotificationService.markAsRead(notificationId);
    fetchNotifications();
  };

  useEffect(() => {
    if (!userId) return;
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faBell}
        onClick={() => setShowList(!showList)}
        className="w-6 h-6 cursor-pointer"
      />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full animate-bounce">
          {count > 9 ? '9+' : count}
        </span>
      )}
      {showList && (
        <div className="absolute right-0 top-8 bg-white text-black rounded shadow-lg w-80 z-50 max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 border-b hover:bg-gray-100 ${
                  !n.wasRead ? "bg-gray-50" : ""
                }`}
              >
                <p className="text-sm mb-1">{n.message}</p>

                {/* Phân biệt bằng map enum */}
                {NotificationTypeMap[n.type] === "InviteToGroup" &&
                 NotificationStatusMap[n.status] === "Pending" && (
                  <div className="flex gap-2 text-sm">
                    <button
                      onClick={() => handleAccept(n.id)}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Chấp nhận
                    </button>
                    <button
                      onClick={() => handleReject(n.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Từ chối
                    </button>
                  </div>
                )}

                {NotificationStatusMap[n.status] !== "Pending" && !n.wasRead && (
                  <button
                    onClick={() => handleMarkAsRead(n.id)}
                    className="text-xs text-blue-600 hover:underline mt-1"
                  >
                    Đánh dấu đã đọc
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              Không có thông báo
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
