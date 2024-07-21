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

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Received foreground message:", payload);
      resolve(payload);
    });
  });

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Service Worker registered with scope:", registration.scope);

      // Pass the Firebase configuration to the service worker
      registration.active.postMessage({
        type: "FIREBASE_CONFIG",
        config: firebaseConfig,
      });
    })
    .catch(function (error) {
      console.log("Service Worker registration failed:", error);
    });
}

// Function to show a test notification
export function showTestNotification() {
  console.log("Attempting to show test notification");
  if (Notification.permission === "granted") {
    try {
      new Notification("Test Notification", {
        body: "This is a test notification",
        icon: "/path-to-your-icon.png",
      });
      console.log("Test notification shown successfully");
    } catch (error) {
      console.error("Error showing test notification:", error);
    }
  } else {
    console.log("Notification permission not granted");
  }
}
