// public/firebase-messaging-sw.js
/* eslint-disable */
// public/firebase-messaging-sw.js
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
      click_action: payload.data.url,
    };

    console.log(
      "[firebase-messaging-sw.js] Showing notification: ",
      notificationTitle,
      notificationOptions
    );

    self.registration
      .showNotification(notificationTitle, notificationOptions)
      .then(() =>
        console.log(
          "[firebase-messaging-sw.js] Notification shown successfully"
        )
      )
      .catch((error) =>
        console.error(
          "[firebase-messaging-sw.js] Error showing notification:",
          error
        )
      );
  });
}

self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click Received.");
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || "/donor-dashboard")
  );
});
