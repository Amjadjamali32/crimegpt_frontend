import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { 
  getUserNotifications, 
  deleteNotification, 
  deleteAllUserNotifications, 
  markNotificationAsRead, 
  getSingleNotification, 
  getAllAdminNotifications, 
  getSingleAdminNotification, 
  deleteAdminNotification, 
  deleteAllAdminNotification 
} from "../services/notificationService.js";

// async thunks for user notifications
export const fetchUserNotifications = createAsyncThunk(
  'notifications/fetchUserNotifications',
  async (id, thunkAPI) => {
    try {
      const response = await getUserNotifications(id);
      return response.data?.notifications || []; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (id, thunkAPI) => {
    try {
      await markNotificationAsRead(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchSingleNotification = createAsyncThunk(
  'notifications/fetchSingleNotification',
  async (id, thunkAPI) => {
    try {
      const response = await getSingleNotification(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeNotification = createAsyncThunk(
  'notifications/removeNotification',
  async (id, thunkAPI) => {
    try {
      await deleteNotification(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeAllUserNotifications = createAsyncThunk(
  'notifications/removeAllUserNotifications',
  async (_, thunkAPI) => {
    try {
      await deleteAllUserNotifications();
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, thunkAPI) => {
    try {
      const notifications = thunkAPI.getState().notifications.userNotifications;
      const unreadNotifications = notifications.filter((notification) => !notification.isRead);
      await Promise.all(unreadNotifications.map((notification) => 
        markNotificationAsRead(notification._id)
      ));
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const selectUnreadNotificationsCount = createSelector((state) => 
  state.notification.userNotifications,
  (notifications) => notifications.filter(n => !n.isRead).length
);

// async thunks for admin notifications
export const fetchAllAdminNotifications = createAsyncThunk(
    'notifications/fetchAllAdminNotifications',
    async (_, thunkAPI) => {
      try {
        const response =  await getAllAdminNotifications();
        return response.data?.notifications || [];
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
);

export const fetchSingleAdminNotification = createAsyncThunk(
    'notifications/fetchSingleAdminNotification',
    async (id, thunkAPI) => {
      try {
        return await getSingleAdminNotification(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
);

export const removeAdminNotification = createAsyncThunk(
    'notifications/removeAdminNotification',
    async (id, thunkAPI) => {
      try {
        await deleteAdminNotification(id)
        return id;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
);

export const removeAllAdminNotifications = createAsyncThunk(
    'notifications/removeAllAdminNotifications',
    async (_, thunkAPI) => {
      try {
        return await deleteAllAdminNotification();
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
);

// Initial State
const initialState = {
  userNotifications: [],
  adminNotifications: [],
  singleNotification: null,
  loading: false,
  error: null,
  isSuccess: false,
  message: "",
};

// Slice
const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.userNotifications = [];
      state.adminNotifications = [];
      state.singleNotification = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch User Notifications
    builder.addCase(fetchUserNotifications.pending, (state) => {
      state.loading = true;
      state.isSuccess = false;
      state.error = null;
    })
    .addCase(fetchUserNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.isSuccess = true;
      state.userNotifications = action.payload; 
    })
    .addCase(fetchUserNotifications.rejected, (state, action) => {
      state.loading = false;
      state.isSuccess = false;
      state.error = action.payload;
    })

    // Handle Mark As Read 
    .addCase(markAsRead.pending, (state) => {
      state.loading = true;
    })
    .addCase(markAsRead.fulfilled, (state, action) => {
      state.loading = false;
      state.userNotifications = state.userNotifications.map((notification) =>
        notification._id === action.payload ? { ...notification, isRead: true } : notification
      );
    })
    .addCase(markAsRead.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Fetch single notification
    .addCase(fetchSingleNotification.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchSingleNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.singleNotification = action.payload;
    })
    .addCase(fetchSingleNotification.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Remove Notification
    .addCase(removeNotification.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(removeNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.userNotifications = state.userNotifications.filter(
        (notification) => notification._id !== action.payload
      );
    })
    .addCase(removeNotification.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Remove all user notifications
    .addCase(removeAllUserNotifications.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(removeAllUserNotifications.fulfilled, (state) => {
      state.loading = false;
      state.userNotifications = [];
    })
    .addCase(removeAllUserNotifications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Mark All Notifications as Read
    .addCase(markAllAsRead.pending, (state) => {
      state.loading = true;
    })
    .addCase(markAllAsRead.fulfilled, (state) => {
      state.loading = false;
      state.userNotifications = state.userNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      }));
    })
    .addCase(markAllAsRead.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Admin notifications
    // Fetch All Admin Notifications
    builder.addCase(fetchAllAdminNotifications.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAllAdminNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.adminNotifications = action.payload;
    })
    .addCase(fetchAllAdminNotifications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch Single Admin Notification
    builder.addCase(fetchSingleAdminNotification.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSingleAdminNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.singleNotification = action.payload;
    })
    .addCase(fetchSingleAdminNotification.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete Admin Notification
    builder.addCase(removeAdminNotification.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(removeAdminNotification.fulfilled, (state, action) => {
      state.loading = false;
      state.adminNotifications = state.adminNotifications.filter(
        (notification) => notification._id !== action.payload
      );
    })
    .addCase(removeAdminNotification.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete All Admin Notifications
    builder.addCase(removeAllAdminNotifications.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(removeAllAdminNotifications.fulfilled, (state) => {
      state.loading = false;
      state.adminNotifications = [];
    })
    .addCase(removeAllAdminNotifications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

  },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;