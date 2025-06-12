import axiosInstance from "../../../utils/axiosInstance.js"; 

const API_URL = import.meta.env.VITE_API_URL; 

// get all notifications
export const getUserNotifications = async (userId) => {
  const response = await axiosInstance.get(
    `${API_URL}/notifications/user/${userId}/get`,
    { withCredentials: true }
  );
  return response.data;
};

// mark as read
export const markNotificationAsRead = async (id) => {
  const response = await axiosInstance.patch(`${API_URL}/notifications/${id}/read`, {}, {
    withCredentials: true, 
  });
  // console.log("Response:", response.data);
  return response.data;
};

// get single
export const getSingleNotification = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/notifications/${id}`, {
    withCredentials: true, 
  });
  return response.data;
};

// delete single
export const deleteNotification = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/notifications/${id}`, {
    withCredentials: true, 
  });
  return response.data;
};

// delete all
export const deleteAllUserNotifications = async () => {
  const response = await axiosInstance.delete(`${API_URL}/notifications/`, {
    withCredentials: true,
  });
  return response.data;
};
  
export const getAllAdminNotifications = async () => {
  const response = await axiosInstance.get(`${API_URL}/notifications/admin/all-notifications`);
  return response.data;
};
  
export const getSingleAdminNotification = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/notifications/admin/${id}`);
  return response.data;
};

export const deleteAdminNotification = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/notifications/admin/${id}`);
  return response.data;
};

export const deleteAllAdminNotification = async (id) => {
  const response = await axiosInstance.delete(`${API_URL}/notifications/${id}`);
  return response.data;
};