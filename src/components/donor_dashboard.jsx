import React, { useEffect, useState } from "react";
import { getRequestNotifications } from "../api";

const DonorDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const donorInfo = JSON.parse(localStorage.getItem("donorInfo"));
      const data = await getRequestNotifications(donorInfo.blood_type);
      setNotifications(data);
    } catch (err) {
      setError("Failed to fetch notifications");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Donor Dashboard
        </h1>
        <p className="text-gray-700 mb-4">
          Welcome to your donor dashboard. Here you can view blood requests
          matching your blood type.
        </p>
        <h2 className="text-xl font-bold mt-8 mb-4">
          Blood Request Notifications
        </h2>
        {notifications.length > 0 ? (
          <ul className="space-y-2">
            {notifications.map((notification, index) => (
              <li key={index} className="p-2 bg-red-100 rounded">
                <p>Blood Type: {notification.blood_type_requested}</p>
                <p>Urgency: {notification.urgency_level}</p>
                <p>Location: {notification.location}</p>
                <p>
                  Date: {new Date(notification.request_date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No matching blood requests at the moment.</p>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default DonorDashboard;
