// public/firebase-messaging-sw.js
/* eslint-disable */
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "VITE_REACT_APP_FIREBASE_API_KEY",
  authDomain: "VITE_REACT_APP_FIREBASE_AUTH_DOMAIN",
  projectId: "VITE_REACT_APP_FIREBASE_PROJECT_ID",
  storageBucket: "VITE_REACT_APP_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
  appId: "VITE_REACT_APP_FIREBASE_APP_ID",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
