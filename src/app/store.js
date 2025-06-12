import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice.js";
import userReducer from "./features/user/userSlice.js";
import reportReducer from "./features/reports/reportSlice.js";
import feedbackReducer from "./features/feedback/feedbackSlice.js";
import notificationReducer from "./features/notifications/notificationSlice.js";
import evidenceReducer from "./features/evidence/evidenceSlice.js";

// Load state from localStorage
const preloadedState = {
  notification: {
    userNotifications: JSON.parse(localStorage.getItem("userNotifications")) || [],
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    report: reportReducer,
    feedback: feedbackReducer,
    notification: notificationReducer,
    evidence: evidenceReducer, 
  },
  preloadedState, 
});

export default store;
