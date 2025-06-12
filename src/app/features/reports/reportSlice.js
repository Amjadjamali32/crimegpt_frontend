import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportService from "../services/reportService.js";

// Submit Crime Report
export const submitCrimeReport = createAsyncThunk(
  "report/submitCrimeReport",
  async (reportData, thunkAPI) => {
    try {
      return await reportService.submitCrimeReport(reportData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch All Crime Reports for User
export const fetchAllUserReports = createAsyncThunk(
  "report/fetchAllUserReports",
  async ({ userId, queryParams }, thunkAPI) => {
    try {
      return await reportService.fetchAllUserReports(userId, queryParams);
    } catch (error) {
      console.log("Error fetching reports:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch Single Crime Report for User
export const fetchSingleUserReport = createAsyncThunk(
  "report/fetchSingleUserReport",
  async ({ userId, reportId }, thunkAPI) => {
    try {
      return await reportService.fetchSingleUserReport(userId, reportId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Crime Report for User
export const deleteUserReport = createAsyncThunk(
  "report/deleteUserReport",
  async ({ userId, reportId }, thunkAPI) => {
    try {
      return await reportService.deleteUserReport(userId, reportId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete All Crime Reports for User
export const deleteAllUserReports = createAsyncThunk(
  "report/deleteAllUserReports",
  async (userId, thunkAPI) => {
    try {
      return await reportService.deleteAllUserReports(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Check Report Status
export const checkReportStatus = createAsyncThunk(
  "report/checkReportStatus",
  async ({ userId, caseNumber }, thunkAPI) => {
    try {
      return await reportService.checkReportStatus(userId, caseNumber);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch All Crime Reports for Admin
export const fetchAllAdminReports = createAsyncThunk(
  "report/fetchAllAdminReports",
  async (queryParams, thunkAPI) => {
    try {
      const response = await reportService.fetchAllAdminReports(queryParams);
      return response.data; // Return just the data array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch Single Crime Report for Admin
export const fetchSingleAdminReport = createAsyncThunk(
  "report/fetchSingleAdminReport",
  async (reportId, thunkAPI) => {
    try {
      return await reportService.fetchSingleAdminReport(reportId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Crime Report for Admin
export const updateAdminReport = createAsyncThunk(
  "report/updateAdminReport",
  async ({ reportId, reportData }, thunkAPI) => {
    try {
      return await reportService.updateAdminReport(reportId, reportData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Crime Report for Admin
export const deleteAdminReport = createAsyncThunk(
  "report/deleteAdminReport",
  async (reportId, thunkAPI) => {
    try {
      return await reportService.deleteAdminReport(reportId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete All Crime Reports for Admin
export const deleteAllAdminReports = createAsyncThunk(
  "report/deleteAllAdminReports",
  async (_, thunkAPI) => {
    try {
      return await reportService.deleteAllAdminReports();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add New Crime Report for Admin
export const addNewAdminReport = createAsyncThunk(
  "report/addNewAdminReport",
  async (reportData, thunkAPI) => {
    try {
      return await reportService.addNewAdminReport(reportData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Report Status
export const updateReportStatus = createAsyncThunk(
  "report/updateReportStatus",
  async ({ reportId, statusData }, thunkAPI) => {
    try {
      return await reportService.updateReportStatus(reportId, statusData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Helper function to save state to localStorage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reportState", serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

// Helper function to load state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reportState");
    if (serializedState === null) {
      return undefined; // Return undefined to use the initial state
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
  reports: [],
  singleReport: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isDeleted: false,
  message: "",
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isDeleted = false;
      state.isDeletedAll = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Crime Report
      .addCase(submitCrimeReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitCrimeReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reports.push(action.payload);
        state.message = action.payload || "Crime report submitted successfully";
      })
      .addCase(submitCrimeReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Fetch All Crime Reports for User
      .addCase(fetchAllUserReports.pending, (state) => {
        if (!state.isLoading) state.isLoading = true;
      })
      .addCase(fetchAllUserReports.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.reports = action.payload.data || []; 
        state.message = action.payload?.message || "Crime reports fetched successfully";
      })
      .addCase(fetchAllUserReports.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Fetch Single Crime Report for User
      .addCase(fetchSingleUserReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleUserReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.singleReport = action.payload;
        state.message = action.payload?.message || "Crime report fetched successfully";
      })
      .addCase(fetchSingleUserReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Crime Report for User
      .addCase(deleteUserReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reports = state.reports.filter(
          (report) => report._id !== action.payload._id
        );
        state.message = "Crime report deleted successfully";
      })
      .addCase(deleteUserReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Check Report Status
      .addCase(checkReportStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = false; 
        state.singleReport = null; 
      })
      .addCase(checkReportStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleReport = action.payload;
        state.isError = false;
      })
      .addCase(checkReportStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to retrieve report status.";
      })
      // Fetch All Crime Reports for Admin
      .addCase(fetchAllAdminReports.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchAllAdminReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.reports = action.payload;
      })
      .addCase(fetchAllAdminReports.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Error in fetching reports!";
      })
      // Fetch Single Crime Report for Admin
      .addCase(fetchSingleAdminReport.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchSingleAdminReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleReport = action.payload;
      })
      .addCase(fetchSingleAdminReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Error in fetching single report!";
      })
      // Delete Crime Report for Admin
      .addCase(deleteAdminReport.pending, (state) => {
        state.isLoading = true;
        state.isDeleted = false; 
      })
      .addCase(deleteAdminReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isDeleted = true;
        state.reports = state.reports.filter(
          (report) => report._id !== action.payload._id 
        );
        state.message = "Crime report deleted successfully";
        saveStateToLocalStorage(state); 
      })
      .addCase(deleteAdminReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // update admin reports
      .addCase(updateAdminReport.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateAdminReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.reports = state.reports.map(report => 
          report._id === action.payload._id ? action.payload : report
        );
        if (state.singleReport && state.singleReport._id === action.payload._id) {
          state.singleReport = action.payload;
        }
        state.message = "Report updated successfully";
      })
      .addCase(updateAdminReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete All Crime Reports for User
      .addCase(deleteAllUserReports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllUserReports.fulfilled, (state) => {
        localStorage.removeItem("reportState");
        state.isLoading = false;
        state.isSuccess = true;
        state.reports = [];
        state.message = "All crime reports deleted successfully";
      })
      .addCase(deleteAllUserReports.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Add New Crime Report for Admin
      .addCase(addNewAdminReport.pending, (state) => {
        state.isLoading = true;
        state.isError = true;
      })
      .addCase(addNewAdminReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.reports.push(action.payload);
        state.message = "Crime report added successfully";
      })
      .addCase(addNewAdminReport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { resetState } = reportSlice.actions;
export default reportSlice.reducer;