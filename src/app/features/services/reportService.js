import axiosInstance from "../../../utils/axiosInstance.js";

const API_URL = import.meta.env.VITE_API_URL;

// Submit Crime Report
const submitCrimeReport = async (reportData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/reports`, reportData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || "Failed to submit crime report");
  }
};

// Fetch All Crime Reports for User
const fetchAllUserReports = async (userId, queryParams) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/reports/user/${userId}`, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user reports");
  }
};

// Fetch Single Crime Report for User
const fetchSingleUserReport = async (userId, reportId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/reports/${reportId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch single report");
  }
};

// Delete Crime Report for User
const deleteUserReport = async (userId, reportId) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/reports/${reportId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete report");
  }
};

// Delete All Crime Reports for User
const deleteAllUserReports = async (userId) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/reports/user/${userId}/all`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete all reports");
  }
};

// Check Report Status
const checkReportStatus = async (userId, caseNumber) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/reports/status`, {
      userId, // Pass userId in the request body
      caseNumber, // Pass caseNumber in the request body
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to check report status");
  }
};

// Fetch All Crime Reports for Admin
const fetchAllAdminReports = async (queryParams) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/reports/`, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch admin reports");
  }
};

// Fetch Single Crime Report for Admin
const fetchSingleAdminReport = async (reportId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/reports/admin/${reportId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch single admin report");
  }
};

// Update Crime Report for Admin
const updateAdminReport = async (reportId, reportData) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/reports/admin/${reportId}`, reportData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update report");
  }
};

// Delete Crime Report for Admin
const deleteAdminReport = async (reportId) => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/reports/admin/${reportId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete report");
  }
};

// Delete All Crime Reports for Admin
const deleteAllAdminReports = async () => {
  try {
    const response = await axiosInstance.delete(`${API_URL}/reports/admin/all`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete all reports");
  }
};

// Add New Crime Report for Admin
const addNewAdminReport = async (reportData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/reports/admin/`, reportData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add new report");
  }
};

// Update Report Status
const updateReportStatus = async (reportId, statusData) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/reports/status/${reportId}`, statusData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update report status");
  }
};

const reportService = {
  submitCrimeReport,
  fetchAllUserReports,
  fetchSingleUserReport,
  deleteUserReport,
  deleteAllUserReports,
  checkReportStatus,
  fetchAllAdminReports,
  fetchSingleAdminReport,
  updateAdminReport,
  deleteAdminReport,
  deleteAllAdminReports,
  addNewAdminReport,
  updateReportStatus,
};

export default reportService;