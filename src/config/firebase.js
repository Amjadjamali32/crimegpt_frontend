import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

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

const vapidKey =
  "BEFIgMfHfAj85vnyX2bK2n-9qKw7w5H1l8K2Dp_NvuQJRbXlZXzJwHoRWQeLOT-_hR8Zl0dcS3KPDssFRgBstug";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request notification permission from the user
export const requestNotificationPermission = async () => {
  try {
    // Request permission for notifications
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      return true;
    } else {
      console.warn("Notification permission denied.");
      return false;
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return false;
  }
};

// Request FCM token
export const requestFCMToken = async () => {
  try {
    // Ensure user has granted notification permission
    const permissionGranted = await requestNotificationPermission();
    if (!permissionGranted) {
      return null; // If permission isn't granted, do not proceed
    }

    // Get the FCM token if permission is granted
    const token = await getToken(messaging, { vapidKey });
    if (token) {
      console.log("FCM Token:", token); // Log the token for debugging
      return token; // Return the token if available
    } else {
      console.warn("No FCM token found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching FCM token:", error);
    throw error;
  }
};

// Handle foreground notifications
export const onMessageListener = () =>
  new Promise((resolve, reject) => {
    onMessage(messaging, (payload) => {
      console.log("Foreground Message received:", payload);

      // Check if permission is granted and show notification in the foreground
      if (Notification.permission === "granted") {
        const { title, body } = payload.notification;
        new Notification(title, {
          body,
        });
      }

      resolve(payload); // Resolve with the payload
    }, reject);
});


// for refresh tokens 
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage, deleteToken } from "firebase/messaging";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAmvGF8iU9yWjQTBKFFBZgAZZv6K3BzyA8",
//   authDomain: "fyp-project-3be5c.firebaseapp.com",
//   projectId: "fyp-project-3be5c",
//   storageBucket: "fyp-project-3be5c.appspot.com",
//   messagingSenderId: "836043524721",
//   appId: "1:836043524721:web:49ee1423bd44ccc16569d0",
//   measurementId: "G-D7XP14VC48",
// };

// const vapidKey = "BJyIateIGg21Zmmxevtuj6h80yDZeHL8rAgOSvkgHyEmZNUWKk5uSyM0mwQwQvSaTJFdXlVfjGOvxX5LSmo58Ms";

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// // Request notification permission
// export const requestNotificationPermission = async () => {
//   try {
//     const permission = await Notification.requestPermission();
//     return permission === "granted";
//   } catch (error) {
//     console.error("Error requesting notification permission:", error);
//     return false;
//   }
// };

// // Request FCM token (handles refresh)
// export const requestFCMToken = async (userId) => {
//   try {
//     const permissionGranted = await requestNotificationPermission();
//     if (!permissionGranted) return null;

//     const currentToken = await getToken(messaging, { vapidKey });

//     if (currentToken) {
//       console.log("FCM Token:", currentToken);
//       await saveTokenToDB(userId, currentToken); // Store in DB
//       return currentToken;
//     } else {
//       console.warn("No FCM token found.");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching FCM token:", error);
//     throw error;
//   }
// };

// // 🔄 Handle Token Refresh (Check and Update)
// export const refreshFCMToken = async (userId) => {
//   try {
//     await deleteToken(messaging); // Delete old token
//     console.log("Old FCM token deleted");

//     const newToken = await getToken(messaging, { vapidKey });
//     if (newToken) {
//       console.log("New FCM Token:", newToken);
//       await saveTokenToDB(userId, newToken); // Update in DB
//     }
//   } catch (error) {
//     console.error("Error refreshing FCM token:", error);
//   }
// };

// // Handle foreground notifications
// export const onMessageListener = () =>
//   new Promise((resolve, reject) => {
//     onMessage(messaging, (payload) => {
//       console.log("Foreground Message received:", payload);

//       if (Notification.permission === "granted") {
//         const { title, body } = payload.notification;
//         new Notification(title, { body });
//       }

//       resolve(payload);
//     }, reject);
//   });

// // 📌 Function to save token to Firestore (or backend)
// import { getFirestore, setDoc, doc } from "firebase/firestore";

// const saveTokenToDB = async (userId, token) => {
//   if (!userId) return;
//   const db = getFirestore();
//   await setDoc(doc(db, "users", userId), { fcmToken: token }, { merge: true });
// };
