importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbfdIFc8IZSRp9hRsrhR4xJtJspDvaeMo",
  authDomain: "test-ba39b.firebaseapp.com",
  projectId: "test-ba39b",
  storageBucket: "test-ba39b.firebasestorage.app",
  messagingSenderId: "1055830303323",
  appId: "1:1055830303323:web:881024406ca4dd6089957e",
  measurementId: "G-8LY8MJH1YS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get messaging instance
const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log("Background message received: ", payload);

  const notificationTitle = payload.notification?.title || "Default Title";
  const notificationOptions = {
    body: payload.notification?.body || "Default Body",
  };

  // Display the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});