import React, { useEffect, useState } from "react";
import NotificationCard from "../components/notificationspage/NotificationCard";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const NotificationsPage = () => {
  const { currentUser } = useAuth();
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchNotifs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/notifications/${currentUser}`
        );
        setNotifs(res.data);
         console.log("Fetched notifs:", res.data);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };

    fetchNotifs();
  }, [currentUser]);

  const handleMarkAsRead = async (notifId) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${notifId}/read`);

      setNotifs((prevNotifs) =>
        prevNotifs.map((n) =>
          n.id === notifId ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  if (!currentUser) {
    return <div className="p-6 text-gray-100">Loading user...</div>;
  }

  return (
    <div className="p-6 text-gray-100 bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <ul className="space-y-4">
        {notifs.map((notif) => (
          <NotificationCard
            key={notif.id}
            notif={notif}
            onMarkAsRead={handleMarkAsRead}
          />
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
