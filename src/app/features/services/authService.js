import axios from "axios";
import Cookies from "js-cookie";
import axiosInstance from "../../../utils/axiosInstance";

const API_URL = import.meta.env.VITE_API_URL; 

// Register User
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Verify Email
const verifyEmail = async (token) => {
  const response = await axios.get(`${API_URL}/auth/verify/${token}`);
  return response.data;
};

// Login User
const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Update FCM Token
const updateFCMToken = async (userId, fcmToken) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/auth/refresh-fcm`, {
      userId,
      fcmToken,
    });
    return response.data;
  } catch (error) {
    console.error("Update FCM Token Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Forgot Password
const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
  return response.data;
};

// Reset Password
const resetPassword = async (token, password) => {
  console.log("Sending reset password request...");
  console.log("Token:", token);
  console.log("Password:", password);

  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, { token, password });
    console.log("Reset Password Response: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Reset Password Error: ", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Refresh Access Token
const refreshToken = async () => {
  try {
    const response = await axiosInstance.post(`${API_URL}/auth/refresh-token`, {}, { withCredentials: true });
    return response.data; 
  } catch (error) {
    console.error("Refresh Token Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Get Current User
const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/auth/profile`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Get Current User Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Logout User
const logout = async () => {
  try {
    await axiosInstance.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userNotifications");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  } catch (error) {
    console.error("Logout Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

const authService = {
  register,
  verifyEmail,
  login,
  updateFCMToken,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
  getCurrentUser,
};

export default authService;
