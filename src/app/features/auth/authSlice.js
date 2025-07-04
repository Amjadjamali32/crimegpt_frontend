import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService.js";
import Cookies from "js-cookie";

// Helper function to update localStorage
const updateLocalStorage = (user, role, isLoggedIn) => {
  if (user) localStorage.setItem("user", JSON.stringify(user));
  if (role) localStorage.setItem("role", role);
  localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
};

// Helper function to clear localStorage
const clearLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  localStorage.removeItem("isLoggedIn");
};

// Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Verify Email
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, thunkAPI) => {
    try {
      return await authService.verifyEmail(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.login(userData);
      Cookies.set("access_token", response.data.accessToken, { expires: 1, secure: true });
      Cookies.set("refresh_token", response.data.refreshToken, { expires: 7, secure: true });
      updateLocalStorage(response.data.user, response.data.user?.role, true);

      // Update FCM token in the backend if provided
      if (userData.fcmToken) {
        await thunkAPI.dispatch(updateFCMToken({ userId: response.data.user._id, fcmToken: userData.fcmToken }));
      }

      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update FCM Token
export const updateFCMToken = createAsyncThunk(
  "auth/updateFCMToken",
  async ({ userId, fcmToken }, thunkAPI) => {
    try {
      return await authService.updateFCMToken(userId, fcmToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// remaining for refresgin token
export const refreshTokens = createAsyncThunk(
  "auth/refreshTokens",
  async (_, thunkAPI) => {
    try {
      const refreshToken = Cookies.get("refresh_token");
      if (!refreshToken) throw new Error("No refresh token");
      
      const response = await authService.refreshToken(refreshToken);
      Cookies.set("access_token", response.data.access_token, { expires: 1, secure: true });
      return response.data.access_token;
    } catch (error) {
      clearLocalStorage();
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      console.error("Token Refresh Error:", error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue("Session expired. Please login again.");
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  authService.logout();
  clearLocalStorage();
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  return {};
});

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      return await authService.forgotPassword(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, thunkAPI) => {
    try {
      return await authService.resetPassword(token, newPassword);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get Current User
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await authService.getCurrentUser();
      const role = response.data?.role || null;
      updateLocalStorage(response.data, role, true);
      return response.data;
    } catch (error) {
      // Only clear storage if it's an authentication error (401)
      if (error.response?.status === 401) {
        clearLocalStorage();
      }
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const getInitialAuthState = () => {
  // Check for tokens first
  const hasTokens = Cookies.get("access_token") && Cookies.get("refresh_token");
  
  return {
    isLoggedIn: hasTokens && localStorage.getItem("isLoggedIn") === "true",
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    role: localStorage.getItem("role") || null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  };
};

const initialState = getInitialAuthState();

// const initialState = {
//   isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
//   user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
//   role: localStorage.getItem("role") || null,
//   isLoading: false,
//   isSuccess: false,
//   isError: false,
//   message: "",
// };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("role", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.role = action.payload?.role || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        clearLocalStorage(); 
      })

      // Update FCM Token
      .addCase(updateFCMToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFCMToken.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "FCM token updated successfully";
      })
      .addCase(updateFCMToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.role = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.role = action.payload?.role || null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        clearLocalStorage(); 
      });
  },
});

export const { resetState, setUserRole } = authSlice.actions;
export default authSlice.reducer;