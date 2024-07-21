import React, { useEffect, useState } from "react";
import { onMessageListener } from "../config/FirebaseInit";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsubscribe = onMessageListener()
      .then((payload) => {
        setShow(true);
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
      })
      .catch((err) => console.log("failed: ", err));

    return () => unsubscribe;
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 m-4 p-4 bg-red-500 text-white rounded shadow-lg">
      <h2 className="text-lg font-bold">{notification.title}</h2>
      <p>{notification.body}</p>
      <button
        className="mt-2 px-2 py-1 bg-white text-red-500 rounded"
        onClick={() => setShow(false)}
      >
        Close
      </button>
    </div>
  );
};

export default Notification;
