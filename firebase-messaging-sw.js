// public/firebase-messaging-sw.js
/* eslint-disable */
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js"
);

let firebaseConfig = null;

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "FIREBASE_CONFIG") {
    firebaseConfig = event.data.config;
    initializeFirebase();
  }
});

function initializeFirebase() {
  if (!firebaseConfig) return;

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

self.addEventListener("push", function (event) {
  console.log("[Service Worker] Push Received.");
  // Handle push event if needed
});

self.addEventListener("pushsubscriptionchange", function (event) {
  console.log("[Service Worker] Push Subscription Change.");
  // Handle subscription change if needed
});

self.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker] Notification click Received.");
  event.notification.close();
  const url = event.notification.data.url || "/donor-dashboard";
  event.waitUntil(clients.openWindow(url));
});
