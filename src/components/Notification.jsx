import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  onMessageListener,
  requestNotificationPermission,
} from "../config/FirebaseInit";

const Notification = () => {
  const navigate = useNavigate();
  const [latestNotification, setLatestNotification] = useState(null);

  useEffect(() => {
    console.log("Setting up notification listener");

    requestNotificationPermission().then((token) => {
      if (token) {
        console.log("Notification permission granted and token received");
      } else {
        console.log("Failed to get notification permission or token");
      }
    });

    const handleMessage = (payload) => {
      console.log("Received foreground message:", payload);
      const { title, body } = payload.notification;
      const { url, requestId } = payload.data;

      setLatestNotification({ title, body, url, requestId });

      // Show a popup notification
      if (Notification.permission === "granted") {
        new Notification(title, {
          body,
          icon: "/path-to-your-icon.png",
        });
      } else {
        console.log("Notification permission not granted");
      }
    };

    // Set up message listener
    const unsubscribe = onMessageListener()
      .then(handleMessage)
      .catch((err) => console.error("Error setting up message listener:", err));

    // Cleanup function
    return () => {
      console.log("Cleaning up notification listener");
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [navigate]);

  // Render in-app notification
  return latestNotification ? (
    <div className="notification-banner">
      <h3>{latestNotification.title}</h3>
      <p>{latestNotification.body}</p>
      <button onClick={() => navigate(latestNotification.url)}>
        View Request
      </button>
    </div>
  ) : null;
};

export default Notification;
