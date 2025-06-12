import axiosInstance from "../../../utils/axiosInstance.js"

// Get all evidences
const getAllEvidences = async () => {
  const response = await axiosInstance.get("/evidences/");
  return response.data;
};

// Get single evidence
const getSingleEvidence = async (id) => {
  const response = await axiosInstance.get(`/evidences/${id}`);
  return response.data;
};

// Delete single evidence
const deleteSingleEvidence = async (id) => {
  const response = await axiosInstance.delete(`/evidences/${id}`);
  return response.data;
};

// Delete all evidences
const deleteAllEvidences = async () => {
  const response = await axiosInstance.delete("/evidences/");
  return response.data;
};

const evidenceService = {
  getAllEvidences,
  getSingleEvidence,
  deleteSingleEvidence,
  deleteAllEvidences,
};

export default evidenceService;