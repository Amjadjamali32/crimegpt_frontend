// slices/feedbackSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedbackService from '../services/feedbackService.js';

// Create feedback
export const createFeedback = createAsyncThunk(
  'feedback/createFeedback',
  async (feedbackData, thunkAPI) => {
    try {
      return await feedbackService.createFeedback(feedbackData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get all feedbacks
export const getAllFeedbacks = createAsyncThunk(
  'feedback/getAllFeedbacks',
  async (_, thunkAPI) => {
    try {
      return await feedbackService.getAllFeedbacks();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Get single feedback
export const getSingleFeedback = createAsyncThunk(
  'feedback/getSingleFeedback',
  async (id, thunkAPI) => {
    try {
      return await feedbackService.getSingleFeedback(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete feedback
export const deleteFeedback = createAsyncThunk(
  'feedback/deleteFeedback',
  async (id, thunkAPI) => {
    try {
      await feedbackService.deleteFeedback(id);
      return { _id: id }; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete all feedbacks
export const deleteAllFeedbacks = createAsyncThunk(
  'feedback/deleteAllFeedbacks',
  async (_, thunkAPI) => {
    try {
      return await feedbackService.deleteAllFeedbacks();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedbacks: [],
    feedback: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create a feeback
      .addCase(createFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.feedbacks.push(action.payload);
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get all feedbacks
      .addCase(getAllFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.feedbacks = Array.isArray(action.payload.data) ? action.payload.data : []; 
      })
      .addCase(getAllFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get single feedback
      .addCase(getSingleFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.feedback = action.payload;
      })
      .addCase(getSingleFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete feedback
      .addCase(deleteFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null
        state.feedbacks = state.feedbacks.filter(
          (feedback) => feedback._id !== action.payload._id 
        );
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete all feedbacks
      .addCase(deleteAllFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAllFeedbacks.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.feedbacks = [];
      })
      .addCase(deleteAllFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default feedbackSlice.reducer;