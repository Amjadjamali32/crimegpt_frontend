import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleAdminReport, resetState } from "../../../app/features/reports/reportSlice.js";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../../components/Sidebar"; // Import your Sidebar component

const SingleAdminReportView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleReport, isLoading, isError, message } = useSelector(
    (state) => state.report
  );

  // Format date in Pakistani format
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
      hour12: true,
    });
  };

  // Handle PDF download
  const handleDownload = () => {
    if (singleReport?.data?.reportPdfUrl) {
      const link = document.createElement('a');
      link.href = singleReport.data.reportPdfUrl;
      link.target = '_blank';
      link.download = `Report_${singleReport.data.caseNumber || id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Download started successfully");
    } else {
      toast.warning("PDF not available for this report");
    }
  };

  // Fetch report data
  useEffect(() => {
    if (!id) {
      toast.error("Invalid report ID");
      navigate("/reports");
      return;
    }

    dispatch(fetchSingleAdminReport(id))
      .unwrap()
      .catch((error) => {
        toast.error(error.message || "Failed to load report");
        navigate("/reports");
      });
  }, [dispatch, id, navigate]);

  // Clean up
  useEffect(() => {
    return () => dispatch(resetState());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <HashLoader color="#173F5C" size={60} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="text-red-600 font-bold text-lg text-center">
          Error: {message || "Failed to load report"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 pt-8 sm:pt-12">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="pt-20 md:pt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-inter">
          <div className="bg-gray-200 border border-custom-teal rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 mb-2">
            {/* Header Section */}
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words text-center sm:text-left">
                <span className="block font-extrabold text-2xl my-3">Report Details</span>
                <span className="block mt-1 sm:mt-2">Case Number: {singleReport?.data?.caseNumber || "N/A"}</span>
              </h2>
              
              <div className="flex flex-col xs:flex-row gap-3">
                <button
                  onClick={() => navigate("/reports")}
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-custom-teal hover:bg-gray-200 text-white rounded-full transition-colors text-sm sm:text-base hover:opacity-80"
                >
                  ← Back to List
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!singleReport?.data?.reportPdfUrl}
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-full transition-colors text-sm sm:text-base"
                >
                  Download PDF
                </button>
              </div>
            </div>

            {/* Report Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <DetailItem label="Report Date" value={formatPakistaniDateTime(singleReport?.data?.createdAt)} />
              
              <DetailItem label="Status">
                <div className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-center text-sm sm:text-base font-inter text-white ${
                  singleReport?.data?.reportStatus === "pending"
                    ? "bg-blue-500"
                    : singleReport?.data?.reportStatus === "rejected"
                    ? "bg-red-500"
                    : singleReport?.data?.reportStatus === "investigating"
                    ? "bg-orange-500"
                    : singleReport?.data?.reportStatus === "closed"
                    ? "bg-gray-500"
                    : "bg-green-500"
                }`}>
                  {singleReport?.data?.reportStatus || "N/A"}
                </div>
              </DetailItem>
              
              <DetailItem label="Location" value={singleReport?.data?.location} />
              <DetailItem label="Crime Type" value={singleReport?.data?.incident_type} />
              
              <DetailItem label="Description" colSpan="full">
                <p className="mt-1 text-gray-900 whitespace-pre-line">
                  {singleReport?.data?.incident_description || "N/A"}
                </p>
              </DetailItem>
              
              <DetailItem label="Complainant Name" value={singleReport?.data?.complainant_name} />
              <DetailItem label="Email" value={singleReport?.data?.complainant_email} />
              <DetailItem label="NIC" value={singleReport?.data?.nic} />
              
              {singleReport?.data?.signatureImageUrl && (
                <DetailItem label="Signature" colSpan="full">
                  <div className="mt-2 p-2 rounded-lg inline-block">
                    <img 
                      src={singleReport.data.signatureImageUrl} 
                      alt="Complainant Signature"
                      className="max-w-full h-auto max-h-32 object-contain"
                    />
                  </div>
                </DetailItem>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable DetailItem component with responsive improvements
const DetailItem = ({ label, value, children, colSpan = "" }) => (
  <div className={`flex flex-col ${colSpan === "full" ? "md:col-span-2" : ""}`}>
    <span className="text-xs sm:text-sm font-medium text-gray-500">{label}</span>
    {children || (
      <span className="mt-1 text-sm sm:text-base text-gray-900 break-words">
        {value || "N/A"}
      </span>
    )}
  </div>
);

export default SingleAdminReportView;