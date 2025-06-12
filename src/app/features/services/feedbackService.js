import axiosInstance from "../../../utils/axiosInstance.js"; 

// Create feedback
const createFeedback = async (feedbackData) => {
  const response = await axiosInstance.post("/feedbacks", feedbackData);
  return response.data;
};

// Get all feedbacks
const getAllFeedbacks = async () => {
  const response = await axiosInstance.get("/feedbacks/"); 
  return response.data;
};

// Get single feedback
const getSingleFeedback = async (id) => {
  const response = await axiosInstance.get(`/feedbacks/${id}`); 
  return response.data;
};

// Delete feedback
const deleteFeedback = async (_id) => {
  const response = await axiosInstance.delete(`/feedbacks/${_id}`);
  return response.data;
};

// Delete all feedbacks
const deleteAllFeedbacks = async () => {
  const response = await axiosInstance.delete("/feedbacks/"); 
  return response.data;
};

const feedbackService = {
  createFeedback,
  getAllFeedbacks,
  getSingleFeedback,
  deleteFeedback,
  deleteAllFeedbacks,
};

export default feedbackService;