// src/firebase-messaging-sw-registration.js
import { firebaseConfig } from "./config/FirebaseConfig";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      registration.active.postMessage({
        type: "FIREBASE_CONFIG",
        config: firebaseConfig,
      });
    })
    .catch((err) => console.log("Service worker registration failed", err));
}
