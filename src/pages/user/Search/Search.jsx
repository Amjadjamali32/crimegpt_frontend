import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { checkReportStatus } from "../../../app/features/reports/reportSlice.js"; // Adjust the import path
import { HashLoader } from "react-spinners"; // Import HashLoader
import { toast } from "react-toastify"; // Import toast for notifications

const SearchReportStatus = () => {
  const dispatch = useDispatch();
  const { singleReport, isLoading, isError, message } = useSelector((state) => state.report);
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
      <div className="pt-16 px-4 sm:px-6 lg:px-8 sm:ml-[250px]">
        {/* Main Content */}
        <form onSubmit={handleSearch} className="max-w-3xl grid grid-cols-1 gap-6 px-4 sm:px-6 lg:px-8 py-8 lg:ms-[5%] xl:ms-[10%]">
          <div className="font-extrabold font-inter text-center">
            <h1 className="text-2xl sm:text-3xl font-inter">Track a Report By Case ID</h1>
          </div>

          {/* Search Input */}
          <div className="relative font-inter">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch size={20} className="text-gray-400 ms-4" />
            </div>
            <input
              type="search"
              id="default-search"
              className="w-full p-4 px-16 text-sm rounded-full bg-gray-200 shadow-lg font-inter focus:outline-custom-teal"
              placeholder="Search Reports..."
              required
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              className="text-white flex items-center font-inter w-3/6 sm:w-2/6 md:w-2/6 lg:w-3/12 xl:w-3/12 justify-center gap-2 p-3 hover:bg-[#2c5573] bg-custom-teal rounded-full"
            >
              <FaSearch size={18} />
              <span>Search</span>
            </button>
          </div>
        </form>

        {/* Initial Message (before any search is performed) */}
        {!hasSearched && !isError && (
          <div className="text-center mt-4 text-gray-600">
            <p className="font-inter">Enter a case number above to track the status of your report.</p>
          </div>
        )}

        {/* Report Details */}
        {hasSearched && singleReport && (
          <div className="bg-gray-200 gap-24 rounded shadow-lg p-6 mb-3 border border-custom-teal font-inter text-center sm:text-left">
            <h2 className="text-xl font-bold pl-7 text-center mb-5">
              Crime Report Details
            </h2>
            <div className="grid grid-cols-1 gap-4 pl-4">
              <div>
                <span className="font-bold">Report Number: </span>
                <u className="mt-1 no-underline">{singleReport.data.caseNumber}</u>
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
                <span className="font-bold">Crime Type: </span>
                <u className="mt-1 no-underline">
                  {cleanIncidentType(singleReport?.data?.incident_type)}
                </u>
              </div>
              <div>
                <span className="font-bold">Reported At: </span>
                <u className="mt-1 no-underline">
                  {formatDate(singleReport?.data?.reportedDate)}
                </u>
              </div>
            </div>
          </div>
        )}

        {/* Error Message (only shown after a search is performed and no report is found) */}
        {hasSearched && isError && (
          <p className="text-center text-red-500 mt-2 font-inter font-semibold mx-auto lg:-ml-12">{message}!</p>
        )}
      </div>
    </>
  );
};

export default SearchReportStatus;