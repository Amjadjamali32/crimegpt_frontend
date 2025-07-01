import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { checkReportStatus } from "../../../app/features/reports/reportSlice.js"; // Adjust the import path
import { HashLoader } from "react-spinners"; // Import HashLoader
import { toast } from "react-toastify"; // Import toast for notifications

const SearchReportStatus = () => {
  const dispatch = useDispatch();
  const { singleReport, isLoading, isError, message } = useSelector(
    (state) => state.report
  );
  const [caseNumber, setCaseNumber] = useState("");
  const [hasSearched, setHasSearched] = useState(false); // Track if the user has performed a search
  const { user } = useSelector((state) => state.auth); // Assuming `auth` is your authentication slice

  console.log("Redux State:", { singleReport, isLoading, isError, message });

  const handleSearch = (e) => {
    e.preventDefault();
    if (caseNumber) {
      const userId = user?._id;
      if (!userId) {
        toast.error("User ID not found. Please log in again.");
        return;
      }
      setHasSearched(true); // Set hasSearched to true when the user performs a search
      dispatch(checkReportStatus({ userId, caseNumber }))
        .unwrap() // Unwrap the promise to handle success and error
        .then(() => {
          toast.success("Report status retrieved successfully!");
        })
        .catch((error) => {
          toast.error(error || "Failed to retrieve report status.");
        });
    }
  };

  // Format date in Pakistani format (DD/MM/YYYY)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits for day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Pakistani date format
  };

  // Remove numbers and special characters from incidentType
  const cleanIncidentType = (incidentType) => {
    return incidentType.replace(/[^a-zA-Z\s]/g, ""); // Keep only letters and spaces
  };

  // Show full-page loader if isLoading is true
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <HashLoader color="#173F5C" size={60} />
      </div>
    );
  }

  return (
    <>
      <div className="pt-24 px-4 sm:px-6 lg:px-8 sm:ml-[250px]">
        {" "}
        {/* Increased top padding */}
        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {" "}
          {/* Centered container with max-width */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-6 py-8">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold font-inter">
                Track a Report By Case ID
              </h1>
            </div>

            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" size={20} />
              </div>
              <input
                type="search"
                id="default-search"
                className="w-full p-4 pl-14 text-sm rounded-full bg-gray-200 shadow-lg focus:outline-custom-teal focus:ring-2 focus:ring-custom-teal"
                placeholder="Search Reports..."
                required
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
              />
            </div>

            {/* Search Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white flex items-center justify-center gap-2 p-3 hover:bg-[#2c5573] bg-custom-teal rounded-full w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <FaSearch size={18} />
                <span>Search</span>
              </button>
            </div>
          </form>
          {/* Initial Message */}
          {!hasSearched && !isError && (
            <div className="text-center mt-4 text-gray-600">
              <p className="font-inter">
                Enter a case number above to track the status of your report.
              </p>
            </div>
          )}
          {/* Report Details */}
          {hasSearched && singleReport && (
            <div className="bg-gray-200 rounded-lg shadow-lg p-6 mb-8 border border-custom-teal">
              <h2 className="text-xl font-bold text-center mb-6">
                Crime Report Details
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-bold sm:w-1/2">Report Number:</span>
                  <span className="sm:w-1/2">
                    {singleReport.data.caseNumber}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-bold sm:w-1/2">Case Status:</span>
                  <span
                    className={`px-4 py-1 rounded-full text-white text-center ${
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
                  <span className="font-bold sm:w-1/2">Crime Type:</span>
                  <span className="sm:w-1/2">
                    {cleanIncidentType(singleReport?.data?.incident_type)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-bold sm:w-1/2">Reported At:</span>
                  <span className="sm:w-1/2">
                    {formatDate(singleReport?.data?.reportedDate)}
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* Error Message */}
          {hasSearched && isError && (
            <p className="text-center text-red-500 font-semibold my-4">
              {message}!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchReportStatus;
