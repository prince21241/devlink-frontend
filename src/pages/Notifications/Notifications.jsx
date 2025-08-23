import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { getAvatarWithInitials } from "../../utils/defaultAvatar";
import { UsersIcon, CheckIcon, HeartIcon, CommentIcon, BellIcon, CloseIcon } from "../../components/Icons/Icons";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(""); // Clear any previous errors
    try {
      const res = await API.get("/api/notifications");
      setNotifications(res.data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      if (err.response) {
        // Server responded with an error status
        setError(`Server error: ${err.response.data?.msg || err.response.status}`);
      } else if (err.request) {
        // Request was made but no response received
        setError("Cannot connect to server. Please check if the backend is running.");
      } else {
        // Something else happened
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationIds) => {
    try {
      await API.put("/api/notifications/mark-read", { notificationIds });
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notificationIds.includes(notification._id) 
            ? { ...notification, isRead: true, readAt: new Date() }
            : notification
        )
      );
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await API.put("/api/notifications/mark-all-read");
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ 
          ...notification, 
          isRead: true, 
          readAt: new Date() 
        }))
      );
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await API.delete(`/api/notifications/${notificationId}`);
      setNotifications(prev => 
        prev.filter(notification => notification._id !== notificationId)
      );
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const clearAllNotifications = async () => {
    if (window.confirm("Are you sure you want to delete all notifications?")) {
      try {
        await API.delete("/api/notifications");
        setNotifications([]);
      } catch (err) {
        console.error("Error clearing all notifications:", err);
      }
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "connection_request":
        return <UsersIcon className="w-6 h-6 text-blue-600" />;
      case "connection_accepted":
        return <CheckIcon className="w-6 h-6 text-green-600" />;
      case "post_like":
        return <HeartIcon className="w-6 h-6 text-red-600" />;
      case "post_comment":
        return <CommentIcon className="w-6 h-6 text-purple-600" />;
      default:
        return <BellIcon className="w-6 h-6 text-gray-600" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "connection_request":
        return "bg-blue-50 border-blue-200";
      case "connection_accepted":
        return "bg-green-50 border-green-200";
      case "post_like":
        return "bg-red-50 border-red-200";
      case "post_comment":
        return "bg-purple-50 border-purple-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-lg">Loading notifications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={fetchNotifications}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <div className="flex gap-2">
            {unreadNotifications.length > 0 && (
              <button
                onClick={markAllAsRead}
                className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
              >
                Mark All Read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <div className="mb-4 flex justify-center">
              <BellIcon className="w-16 h-16 text-gray-300" />
            </div>
            <div className="text-gray-500 mb-2">No notifications</div>
            <p className="text-gray-400">
              You'll see notifications here when people interact with your content or send you connection requests.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Unread Notifications */}
            {unreadNotifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  New ({unreadNotifications.length})
                </h3>
                <div className="space-y-2">
                  {unreadNotifications.map((notification) => (
                    <NotificationItem
                      key={notification._id}
                      notification={notification}
                      onMarkRead={() => markAsRead([notification._id])}
                      onDelete={() => deleteNotification(notification._id)}
                      getNotificationIcon={getNotificationIcon}
                      getNotificationColor={getNotificationColor}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Read Notifications */}
            {readNotifications.length > 0 && (
              <div>
                {unreadNotifications.length > 0 && (
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-8">
                    Earlier
                  </h3>
                )}
                <div className="space-y-2">
                  {readNotifications.map((notification) => (
                    <NotificationItem
                      key={notification._id}
                      notification={notification}
                      onMarkRead={() => markAsRead([notification._id])}
                      onDelete={() => deleteNotification(notification._id)}
                      getNotificationIcon={getNotificationIcon}
                      getNotificationColor={getNotificationColor}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationItem({ notification, onMarkRead, onDelete, getNotificationIcon, getNotificationColor }) {
  const isUnread = !notification.isRead;
  
  return (
    <div className={`border rounded-lg p-4 transition-all hover:shadow-md ${
      isUnread 
        ? `${getNotificationColor(notification.type)} border-l-4` 
        : 'bg-white border-gray-200 opacity-75'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* Notification Icon */}
          <div className="flex-shrink-0">
            {getNotificationIcon(notification.type)}
          </div>
          
          {/* Sender Avatar */}
          {notification.sender ? (
            <img
              src={getAvatarWithInitials(notification.sender.name, notification.sender.profilePicture)}
              alt={notification.sender.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-xs">?</span>
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={`text-sm ${isUnread ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
              {notification.message}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {notification.timeAgo}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          {isUnread && (
            <button
              onClick={onMarkRead}
              className="text-blue-600 hover:text-blue-800 text-xs"
              title="Mark as read"
            >
              Mark Read
            </button>
          )}
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Unread indicator */}
      {isUnread && (
        <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
      )}
    </div>
  );
}
