// public/firebase-messaging-sw.js
/* eslint-disable */
// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js"
);

self.addEventListener("install", function (event) {
  console.log("Service Worker installing.");
});

self.addEventListener("activate", function (event) {
  console.log("Service Worker activating.");
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "FIREBASE_CONFIG") {
    const firebaseConfig = event.data.config;
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(function (payload) {
      console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
      );

      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: "/path-to-your-icon.png",
        data: payload.data,
        tag: "blood-request",
        requireInteraction: true,
      };

      return self.registration.showNotification(
        notificationTitle,
        notificationOptions
      );
    });
  }
});

self.addEventListener("push", function (event) {
  console.log("[Service Worker] Push Received.");
});

self.addEventListener("pushsubscriptionchange", function (event) {
  console.log("[Service Worker] Push Subscription Change.");
});

self.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker] Notification click Received.");
  event.notification.close();
  const url = event.notification.data.url || "/donor-dashboard";
  event.waitUntil(clients.openWindow(url));
});
