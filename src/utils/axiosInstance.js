import axios from "axios";
import Cookies from "js-cookie";

// Token management helpers
const tokenManager = {
  setTokens: (accessToken, refreshToken) => {
    const options = { 
      expires: accessToken ? 1 : 0, 
      secure: import.meta.env.VITE_NODE_ENV === 'production',
      sameSite: 'none',
      path: '/'
    };
    
    if (accessToken) Cookies.set("access_token", accessToken, options);
    if (refreshToken) Cookies.set("refresh_token", refreshToken, { ...options, expires: 7 });
  },
  
  getAccessToken: () => Cookies.get("access_token"),
  getRefreshToken: () => Cookies.get("refresh_token"),
  
  clearTokens: () => {
    ['access_token', 'refresh_token'].forEach(token => {
      Cookies.remove(token, { path: '/', domain: window.location.hostname });
    });
  }
};

const logout = () => {
  tokenManager.clearTokens();
  localStorage.clear();
  sessionStorage.clear();
  window.location.replace('/login');
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    if (token && token !== "undefined" && token.trim() !== "") {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Skip refresh if already retried or auth endpoint
    if (error.response?.status !== 401 || 
        originalRequest._retry || 
        originalRequest.url.includes('/auth/')) {
      return Promise.reject(error);
    }
    
    originalRequest._retry = true;
    
    try {
      const refreshToken = tokenManager.getRefreshToken();
      if (!refreshToken) throw new Error("No refresh token!");
      
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        { refresh_token: refreshToken },
        { withCredentials: true }
      );
      
      if (!response.data.access_token) {
        throw new Error("Invalid refresh response!");
      }
      
      tokenManager.setTokens(response.data.access_token, response.data.refresh_token);
      originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      if (refreshError.response?.status === 401) {
        logout();
      }
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;