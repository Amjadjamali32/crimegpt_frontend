import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService.js";

// Thunk Functions
export const updateAccountDetails = createAsyncThunk(
  "user/updateAccountDetails",
  async ({ userId, userData }, thunkAPI) => {
    try {
      return await userService.updateAccountDetails(userId, userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({ userId, passwordData }, thunkAPI) => {
    try {
      return await userService.updatePassword(userId, passwordData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserDashboard = createAsyncThunk(
  "user/getUserDashboard",
  async (_, thunkAPI) => {
    try {
      return await userService.getUserDashboard();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await userService.getAllUsers();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getSingleUser = createAsyncThunk(
  "admin/getSingleUser",
  async (userId, thunkAPI) => {
    try {
      const response = await userService.getSingleUser(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ userId, userData }, thunkAPI) => {
    try {
      return await userService.updateUser(userId, userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, thunkAPI) => {
    try {
      await userService.deleteUser(id);
      return { _id: id }; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteAllUsers = createAsyncThunk(
  "admin/deleteAllUsers",
  async (_, thunkAPI) => {
    try {
      return await userService.deleteAllUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAdminDashboard = createAsyncThunk(
  "admin/getAdminDashboard",
  async (_, thunkAPI) => {
    try {
      return await userService.getAdminDashboard();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Helper function to save state to localStorage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userState", serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

// Helper function to load state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    if (serializedState === null) {
      return undefined; 
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined;
  }
};

// Load persisted state from localStorage
const persistedState = loadStateFromLocalStorage();

const initialState = persistedState || {
  userDashboard: {},
  allUsers: [],
  singleUser: null,
  adminDashboard: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      saveStateToLocalStorage(state); 
    },
  },
  extraReducers: (builder) => {
    builder
      // Update Account Details
      .addCase(updateAccountDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAccountDetails.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Account details updated successfully";
      })
      .addCase(updateAccountDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Password updated successfully";
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get User Dashboard Data
      .addCase(getUserDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userDashboard = action.payload; 
      })
      .addCase(getUserDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Failed to fetch dashboard data!";
      })

      // Admin: Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allUsers = Array.isArray(action.payload?.data?.users) ? action.payload.data.users : []; 
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.allUsers = []; 
        state.message = action.payload || "Failed to fetch users!";
      })

      // Admin: Get Single User
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleUser = action.payload;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Admin: Update User
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; 
        state.isError = false; 
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "User updated successfully";
        state.message = "User updated successfully";
        if (state.singleUser && state.singleUser.data) {
          state.singleUser.data = { ...state.singleUser.data, ...action.payload };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Admin: Delete User
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "User deleted successfully";
        state.allUsers = state.allUsers.filter((user) => user._id !== action.payload._id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Admin: Delete All Users
      .addCase(deleteAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllUsers.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "All users deleted successfully";
      })
      .addCase(deleteAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Admin: Get Admin Dashboard Data
      .addCase(getAdminDashboard.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAdminDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false; 
        state.adminDashboard = action.payload;
        state.message = "Dashboard data fetched successfully";
      })
      .addCase(getAdminDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false; 
        state.message = action.payload || "Failed to fetch admin dashboard data";
      });
  },
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;