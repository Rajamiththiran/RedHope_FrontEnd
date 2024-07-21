import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Service-Worker-Allowed": "/",
    },
  },
  build: {
    rollupOptions: {
      input: {
        app: "./index.html",
        "firebase-messaging-sw": "./public/firebase-messaging-sw.js",
      },
    },
  },
});
