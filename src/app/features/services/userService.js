import axiosInstance from "../../../utils/axiosInstance.js";

const API_URL = import.meta.env.VITE_API_URL;

// Update Account Details 
const updateAccountDetails = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/users/${userId}/account`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update account details");
  }
};

// Update Password
const updatePassword = async (userId, passwordData) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/users/${userId}/password`, passwordData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update password");
  }
};

// Get User Dashboard Data
const getUserDashboard = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/users/dashboard`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch dashboard data");
  }
};

// Admin: Get All Users
const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/admin/`);
    return {
      success: true,
      message: response.data.message || "Users fetched successfully", 
      data: response.data.data
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch users!");
  }
};

// Admin: Get Single User
const getSingleUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/admin/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};

// Admin: Update User
const updateUser = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/admin/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update user");
  }
};

// Admin: Delete User
const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/admin/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};

// Admin: Delete All Users
const deleteAllUsers = async () => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/admin/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete all users");
  }
};

// Admin: Get Admin Dashboard Data
const getAdminDashboard = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/admin/dashboard/getDashboard`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch admin dashboard data");
  }
};

const userService = {
  updateAccountDetails,
  updatePassword,
  getUserDashboard,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
  getAdminDashboard,
};

export default userService;