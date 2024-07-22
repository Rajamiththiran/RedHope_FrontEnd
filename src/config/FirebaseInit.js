import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig } from "./FirebaseConfig";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

let tokenPromise = null;

export const requestNotificationPermission = () => {
  if (tokenPromise) return tokenPromise;

  tokenPromise = new Promise((resolve) => {
    console.log("Requesting notification permission...");
    Notification.requestPermission().then((permission) => {
      console.log("Notification permission status:", permission);
      if (permission === "granted") {
        getToken(messaging, {
          vapidKey: import.meta.env.VITE_REACT_APP_FIREBASE_VAPID_KEY,
        })
          .then((token) => {
            console.log("FCM Token:", token);
            resolve(token);
          })
          .catch((error) => {
            console.error("Error getting token:", error);
            resolve(null);
          });
      } else {
        console.log("Notification permission denied");
        resolve(null);
      }
    });
  });

  return tokenPromise;
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

      registration.active.postMessage({
        type: "FIREBASE_CONFIG",
        config: firebaseConfig,
      });
    })
    .catch(function (error) {
      console.log("Service Worker registration failed:", error);
    });
}
