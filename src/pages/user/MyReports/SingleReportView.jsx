import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUserReport, resetState } from "../../../app/features/reports/reportSlice.js";
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
      toast.success("Report loaded successfully!", { toastId: "reportSuccess" });
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
    toast.error(message || "Failed to load report details. Please try again later.");
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-red-600 font-bold text-lg font-inter">
          Error: {message || "Failed to load report details. Please try again later."}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 p-1 font-inter">
      <form className="bg-gray-200 mb-4 sm:ms-[41%] sm:w-[58%] md:ms-[33%] md:w-[64%] lg:ms-[25%] lg:w-[72%] xl:ms-[23%] xl:w-[77%] border border-custom-gray shadow-lg p-6 mx-3 rounded-md">
        <h2 className="text-xl font-bold text-center mb-5 underline underline-offset-8">
          Crime Report Details
        </h2>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <span className="font-bold">Report ID: </span>
            <u className="mt-1 no-underline">{singleReport?.data?.caseNumber}</u>
          </div>
          <div>
            <span className="font-bold">Report Date: </span>
            <u className="mt-1 no-underline">
              {formatPakistaniDateTime(singleReport?.data?.reportedDate)}
            </u>
          </div>
          <div>
            <span className="font-bold">Case Status: </span>
            <u
              className={`mt-1 no-underline px-5 py-1.5 rounded-full font-inter ${
                singleReport?.data?.reportStatus === "pending"
                  ? "bg-blue-500"
                  : singleReport?.data?.reportStatus === "rejected"
                  ? "bg-red-500"
                  : singleReport?.data?.reportStatus === "investigating"
                  ? "bg-orange-500"
                  : singleReport?.data?.reportStatus === "closed"
                  ? "bg-gray-500"
                  : "bg-green-500"
              } text-white`}
            >
              {singleReport?.data?.reportStatus}
            </u>
          </div>
          <div>
            <span className="font-bold">Location: </span>
            <u className="mt-1 no-underline">{singleReport?.data?.location}</u>
          </div>
          <div>
            <span className="font-bold">Crime Type: </span>
            <u className="mt-1 no-underline">{singleReport?.data?.incident_type}</u>
          </div>
          <div>
            <span className="font-bold">Description: </span>
            <u className="mt-1 no-underline">{singleReport?.data?.incident_description}</u>
          </div>
          <div>
            <span className="font-bold">Complainant Name: </span>
            <u className="mt-1 no-underline">{singleReport?.data?.complainant_name}</u>
          </div>
          <div>
            <span className="font-bold">Email: </span>
            <u className="mt-1 no-underline">{singleReport?.data?.complainant_email}</u>
          </div>
          <div>
            <span className="font-bold">NIC: </span>
            <u className="mt-1 no-underline">{singleReport?.data?.nic}</u>
          </div>
          <div>
            <span className="font-bold">Complainant Signature: </span>
            <u className="mt-1 no-underline">
              <img src={singleReport?.data?.signatureImageUrl} alt="signature image" className="w-2/6 sm:w-2/12" />
            </u>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SingleReportView;