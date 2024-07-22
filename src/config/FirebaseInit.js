import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig } from "./FirebaseConfig";

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log("Notification permission status:", permission);
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_REACT_APP_FIREBASE_VAPID_KEY,
      });
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("Notification permission denied");
      return null;
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return null;
  }
};

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Received foreground message:", payload);
      resolve(payload);
    });
  });
};

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Service Worker registered with scope:", registration.scope);

      registration.active.postMessage({
        type: "FIREBASE_CONFIG",
        config: firebaseConfig,
      });
    })
    .catch(function (error) {
      console.log("Service Worker registration failed:", error);
    });
}
