import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleUserReport,
  resetState,
} from "../../../app/features/reports/reportSlice.js";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const SingleReportView = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleReport, isLoading, isError, message } = useSelector(
    (state) => state.report
  );
  const { user } = useSelector((state) => state.auth);

  // Status color mapping
  const statusColors = {
    pending: "bg-blue-500",
    rejected: "bg-red-500",
    investigating: "bg-orange-500",
    closed: "bg-gray-500",
    resolved: "bg-green-500",
  };

  // Format date in Pakistani format with animation
  const formatPakistaniDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  // Fetch report data
  useEffect(() => {
    if (!user?._id || !reportId) return;

    dispatch(fetchSingleUserReport({ userId: user._id, reportId }))
      .unwrap()
      .catch(() => {
        toast.error("Failed to load report. Redirecting...");
        navigate("/my-reports");
      });
  }, [dispatch, reportId, user?._id, navigate]);

  // Show success toast when report loads
  useEffect(() => {
    if (singleReport) {
      toast.success("Report loaded successfully!", {
        toastId: "reportSuccess",
      });
    }
  }, [singleReport]);

  // Reset state on unmount
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <HashLoader color="#173F5C" size={60} />
      </div>
    );
  }

  // Error state
  if (isError) {
    toast.error(
      message || "Failed to load report details. Please try again later."
    );
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-red-600 font-bold text-lg font-inter">
          Error:{" "}
          {message || "Failed to load report details. Please try again later."}
        </div>
      </div>
    );
  }

  // Report data fields
  const reportFields = [
    { label: "Report ID", value: singleReport?.data?.caseNumber },
    {
      label: "Report Date",
      value: formatPakistaniDateTime(singleReport?.data?.reportedDate),
    },
    {
      label: "Case Status",
      value: (
        <span
          className={`px-6 py-1 rounded-full text-white text-center inline-block ${
            statusColors[singleReport?.data?.reportStatus] || "bg-gray-500"
          }`}
        >
          {singleReport?.data?.reportStatus}
        </span>
      ),
    },
    { label: "Location", value: singleReport?.data?.location },
    { label: "Crime Type", value: singleReport?.data?.incident_type },
    { label: "Description", value: singleReport?.data?.incident_description },
    { label: "Complainant Name", value: singleReport?.data?.complainant_name },
    { label: "Email", value: singleReport?.data?.complainant_email },
    { label: "NIC", value: singleReport?.data?.nic },
    {
      label: "Complainant Signature",
      value: singleReport?.data?.signatureImageUrl ? (
        <img
          src={singleReport?.data?.signatureImageUrl}
          alt="signature"
          className="w-full max-w-xs border border-gray-300 rounded"
        />
      ) : (
        "N/A"
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-20 px-4 sm:px-6 lg:px-8 font-inter ml-0 lg:ml-64"
    >
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-gray-200 shadow-xl rounded-xl p-6 mx-auto max-w-4xl w-full"
      >
        <motion.h2
          className="text-2xl font-bold text-center mb-6 text-custom-teal"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Crime Report Details
        </motion.h2>

        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          {reportFields.map((field, index) => (
            <motion.div
              key={index}
              className="flex flex-col sm:flex-row p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <span className="font-bold text-gray-700 sm:w-1/4 mb-1 sm:mb-0">
                {field.label}:
              </span>
              <span className="sm:w-3/4 text-gray-600 break-words">
                {field.value || "N/A"}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <motion.div
          className="flex justify-end mt-6 space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all rounded-full"
            onClick={() => navigate(-1)}
          >
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-custom-teal text-white rounded-full hover:bg-teal-600 transition-all"
            onClick={() => navigate("/my-reports")}
          >
            My Reports
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default SingleReportView;
