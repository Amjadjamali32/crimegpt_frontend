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

const SingleReportView = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleReport, isLoading, isError, message } = useSelector(
    (state) => state.report
  );
  const { user } = useSelector((state) => state.auth);

  // Function to format the date in Pakistani format
  const formatPakistaniDateTime = (dateString) => {
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

  // Fetch the single report when the component mounts
  useEffect(() => {
    if (!user?._id || !reportId) return;

    dispatch(fetchSingleUserReport({ userId: user._id, reportId }))
      .unwrap()
      .catch(() => {
        toast.error("Failed to load report. Redirecting...");
        navigate("/my-reports");
      });
  }, [dispatch, reportId, user?._id, navigate]);

  useEffect(() => {
    if (singleReport) {
      toast.success("Report loaded successfully!", {
        toastId: "reportSuccess",
      });
    }
  }, [singleReport]);

  // Reset the state when the component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  // Show loader while data is loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <HashLoader color="#173F5C" size={60} />
      </div>
    );
  }

  // Show error message if there's an error
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

  return (
    <div className="pt-20 px-4 sm:px-6 font-inter">
      <form className="bg-gray-200 border border-custom-gray shadow-lg rounded-md p-6 mx-auto max-w-4xl">
        <h2 className="text-xl font-bold text-center mb-5 underline underline-offset-8">
          Crime Report Details
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-bold sm:w-1/4">Report ID:</span>
            <span className="mt-1 sm:mt-0 sm:w-3/4">
              {singleReport?.data?.caseNumber}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-bold sm:w-1/4">Report Date:</span>
            <span className="mt-1 sm:mt-0 sm:w-3/4">
              {formatPakistaniDateTime(singleReport?.data?.reportedDate)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-bold sm:w-1/4">Case Status:</span>
            <span
              className={`mt-1 sm:mt-0 sm:w-3/4 px-3 py-1 rounded-full text-white text-center ${
                singleReport?.data?.reportStatus === "pending"
                  ? "bg-blue-500"
                  : singleReport?.data?.reportStatus === "rejected"
                  ? "bg-red-500"
                  : singleReport?.data?.reportStatus === "investigating"
                  ? "bg-orange-500"
                  : singleReport?.data?.reportStatus === "closed"
                  ? "bg-gray-500"
                  : "bg-green-500"
              }`}
            >
              {singleReport?.data?.reportStatus}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-bold sm:w-1/4">Location:</span>
            <span className="mt-1 sm:mt-0 sm:w-3/4">
              {singleReport?.data?.location}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-bold sm:w-1/4">Crime Type:</span>
            <span className="mt-1 sm:mt-0 sm:w-3/4">
              {singleReport?.data?.incident_type}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row">
            <span className="font-bold sm:w-1/4">Description:</span>
            <span className="mt-1 sm:mt-0 sm:w-3/4">
              {singleReport?.data?.incident_description}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-bold sm:w-1/4">Complainant Name:</span>
            <span className="mt-1 sm:mt-0 sm:w-3/4">
              {singleReport?.data?.complainant_name}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-bold sm:w-1/4">Email:</span>
            <span className="mt-1 sm:mt-0 sm:w-3/4">
              {singleReport?.data?.complainant_email}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-bold sm:w-1/4">NIC:</span>
            <span className="mt-1 sm:mt-0 sm:w-3/4">
              {singleReport?.data?.nic}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row">
            <span className="font-bold sm:w-1/4">Complainant Signature:</span>
            <div className="mt-1 sm:mt-0 sm:w-3/4">
              {singleReport?.data?.signatureImageUrl && (
                <img
                  src={singleReport?.data?.signatureImageUrl}
                  alt="signature"
                  className="w-full max-w-xs border border-gray-300 rounded"
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SingleReportView;
