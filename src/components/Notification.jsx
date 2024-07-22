import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onMessageListener } from "../config/FirebaseInit";

const Notification = () => {
  const navigate = useNavigate();
  const [latestNotification, setLatestNotification] = useState(null);

  useEffect(() => {
    const handleMessage = async () => {
      try {
        const payload = await onMessageListener();
        const { title, body } = payload.notification;
        const { url, requestId } = payload.data;

        setLatestNotification({ title, body, url, requestId });

        // Show notification even if the tab is not focused
        if (!document.hasFocus()) {
          new Notification(title, {
            body,
            icon: "/path-to-your-icon.png",
          });
        }
      } catch (err) {
        console.log("Failed to receive message:", err);
      }
    };

    const messageHandler = handleMessage();

    return () => {
      messageHandler.then(() => console.log("Message listener cleaned up"));
    };
  }, [navigate]);

  useEffect(() => {
    if (latestNotification) {
      const notification = new Notification(latestNotification.title, {
        body: latestNotification.body,
        icon: "/path-to-your-icon.png",
      });

      notification.onclick = function () {
        navigate(latestNotification.url);
      };
    }
  }, [latestNotification, navigate]);

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
