"use client";

import { format, isToday, isYesterday } from "date-fns";
import { useState } from "react";

type Notification = {
  id: number;
  title: string;
  message: string;
  createdAt: Date;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Welcome!",
    message: "Your account has been created.",
    createdAt: new Date(), // today
  },
  {
    id: 2,
    title: "Payment Reminder",
    message: "Your invoice is due tomorrow.",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)), // yesterday
  },
  {
    id: 3,
    title: "Weekly Summary",
    message: "Here’s what you missed last week.",
    createdAt: new Date("2025-07-23"),
  },
  {
    id: 4,
    title: "System Update",
    message: "We’ve improved our notification system.",
    createdAt: new Date("2025-07-20"),
  },
];

const groupNotifications = (notifications: Notification[]) => {
  const groups: Record<string, Notification[]> = {};

  notifications.forEach((notif) => {
    let label = format(notif.createdAt, "MMMM dd, yyyy");
    if (isToday(notif.createdAt)) {
      label = "Today";
    } else if (isYesterday(notif.createdAt)) {
      label = "Yesterday";
    }
    if (!groups[label]) {
      groups[label] = [];
    }
    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(notif);
  });

  return groups;
};

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  const grouped = groupNotifications(notifications);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          {notifications.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="text-sm text-red-600 hover:underline hover:text-red-700"
            >
              Delete All
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No notifications available.
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([dateLabel, notifs]) => (
              <div key={dateLabel}>
                <h2 className="text-lg font-semibold text-gray-600 mb-4">
                  {dateLabel}
                </h2>
                <div className="space-y-4">
                  {notifs.map((notif) => (
                    <div
                      key={notif.id}
                      className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-all flex justify-between items-start"
                    >
                      <div>
                        <h3 className="text-base font-semibold text-gray-800">
                          {notif.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {notif.message}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(notif.id)}
                        className="text-xs text-red-500 hover:underline ml-4"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
