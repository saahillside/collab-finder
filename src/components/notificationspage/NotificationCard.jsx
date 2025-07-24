import React from 'react';
import { Link } from 'react-router-dom';

const NotificationCard = ({ notif, onMarkAsRead }) => {
  const { id, notifBy, message, isRead, created_at, type, relatedID } = notif;

  return (
    <li
      className={`p-4 rounded-xl shadow transition-colors duration-200 ${
        isRead
          ? 'bg-gray-800 text-gray-400'
          : 'bg-purple-900 text-white'
      }`}
    >
      <p className="text-sm">
        <span className="font-semibold text-white">@{notifBy}</span> {message}
      </p>

      {type === 'response' && relatedID && (
        <Link
          to={`/dashboard/collabs/${relatedID}`}
          className="text-xs text-blue-300 underline hover:text-blue-400 block mt-1"
        >
          View Collab →
        </Link>
      )}

      <p className="text-xs mt-1">{new Date(created_at).toLocaleString()}</p>

      {!isRead && (
        <button
          onClick={() => onMarkAsRead(id)}
          className="mt-2 text-xs text-blue-400 hover:underline"
        >
          Mark as Read
        </button>
      )}
    </li>
  );
};

export default NotificationCard;
