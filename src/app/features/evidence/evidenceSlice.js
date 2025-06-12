import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import evidenceService from "../services/evidenceService.js";

const initialState = {
  evidences: {data: { evidences: [] }},
  evidence: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Get all evidences
export const fetchEvidences = createAsyncThunk(
  "evidence/getAll",
  async (_, thunkAPI) => {
    try {
      return await evidenceService.getAllEvidences();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single evidence
export const fetchSingleEvidence = createAsyncThunk(
  "evidence/getSingle",
  async (id, thunkAPI) => {
    try {
      return await evidenceService.getSingleEvidence(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete single evidence
export const removeSingleEvidence = createAsyncThunk(
  "evidence/deleteSingle",
  async (id, thunkAPI) => {
    try {
      await evidenceService.deleteSingleEvidence(id);
      return id; 
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete all evidences
export const removeAllEvidences = createAsyncThunk(
  "evidence/deleteAll",
  async (_, thunkAPI) => {
    try {
      await evidenceService.deleteAllEvidences();
      return []; 
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const evidenceSlice = createSlice({
  name: "evidence",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Evidences
      .addCase(fetchEvidences.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEvidences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.evidences = action.payload;
      })
      .addCase(fetchEvidences.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Fetch Single Evidence
      .addCase(fetchSingleEvidence.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleEvidence.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.evidence = action.payload;
      })
      .addCase(fetchSingleEvidence.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete Single Evidence
      .addCase(removeSingleEvidence.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeSingleEvidence.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.evidences.data?.evidences) {
          state.evidences.data.evidences = state.evidences.data.evidences.filter(
            (evidence) => evidence._id !== action.payload
          );
        }
      })
      .addCase(removeSingleEvidence.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete All Evidences
      .addCase(removeAllEvidences.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeAllEvidences.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.evidences.data) {
          state.evidences.data.evidences = [];
        }
      })
      .addCase(removeAllEvidences.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = evidenceSlice.actions;
export default evidenceSlice.reducer;