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
      requireInteraction: true, // This will make the notification persist until user interaction
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}

self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click Received.");
  event.notification.close();
  const url = event.notification.data.url || "/donor-dashboard";
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      // If no window/tab is already open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
