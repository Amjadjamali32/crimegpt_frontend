import { useState } from "react";
import { FaSearch, FaInfoCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { checkReportStatus } from "../../../app/features/reports/reportSlice.js";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const SearchReportStatus = () => {
  const dispatch = useDispatch();
  const { singleReport, isLoading, isError, message } = useSelector(
    (state) => state.report
  );
  const [caseNumber, setCaseNumber] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const { user } = useSelector((state) => state.auth);

  console.log("Single Report Data:", singleReport);

  const handleSearch = (e) => {
    e.preventDefault();
    if (caseNumber) {
      const userId = user?._id;
      if (!userId) {
        toast.error("User ID not found. Please log in again!");
        return;
      }
      setHasSearched(true);
      dispatch(checkReportStatus({ userId, caseNumber }))
        .unwrap()
        .then(() => {
          toast.success("Report status retrieved successfully");
        })
        .catch((error) => {
          toast.error(error || "Failed to retrieve report status!");
        });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const cleanIncidentType = (incidentType) => {
    if (!incidentType) return "N/A";
    return incidentType.replace(/[^a-zA-Z\s]/g, "");
  };

  const statusColors = {
    pending: "bg-blue-500",
    rejected: "bg-red-500",
    investigating: "bg-orange-500",
    closed: "bg-gray-500",
    resolved: "bg-green-500",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <HashLoader color="#173F5C" size={60} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24 px-4 sm:px-6 lg:px-8 sm:ml-[250px] font-inter"
    >
      <div className="max-w-4xl mx-auto">
        <motion.form
          onSubmit={handleSearch}
          className="grid grid-cols-1 gap-6 py-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold font-inter text-custom-teal bg-clip-text ">
              Track a Report By Case ID
            </h1>
            <p className="mt-2 text-gray-500">
              Enter your case number to check the current status
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" size={20} />
            </div>
            <motion.input
              type="search"
              id="default-search"
              className="w-full p-4 pl-14 text-sm rounded-full bg-gray-200 shadow-lg focus:outline-custom-teal focus:ring-custom-teal transition-all duration-300"
              placeholder="Enter Case Number..."
              required
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              type="submit"
              className="text-white flex items-center justify-center gap-2 p-3 hover:bg-[#2c5573] bg-custom-teal rounded-full w-3/6 sm:w-1/2 md:w-1/3 lg:w-1/4 transition-all duration-300 hover:shadow-lg"
            >
              <span>Search</span>
            </button>
          </motion.div>
        </motion.form>

        <AnimatePresence>
          {!hasSearched && !isError && (
            <motion.div
              className="text-center mt-4 text-gray-600 p-4 bg-white rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-center gap-2">
                <FaInfoCircle className="text-blue-500" />
                <p className="font-inter">
                  Enter a case number above to track the status of your report.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hasSearched && singleReport && (
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6 mb-8 border border-gray-200 my-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
                Crime Report Details
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  {
                    label: "Report Number",
                    value: singleReport.data.caseNumber,
                  },
                  {
                    label: "Case Status",
                    value: (
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                          statusColors[singleReport?.data?.reportStatus] ||
                          "bg-gray-500"
                        }`}
                      >
                        {singleReport?.data?.reportStatus}
                      </span>
                    ),
                  },
                  {
                    label: "Crime Type",
                    value: cleanIncidentType(singleReport?.data?.incident_type),
                  },
                  {
                    label: "Reported At",
                    value: formatDate(singleReport?.data?.reportedDate),
                  },
                  {
                    label: "Police Station",
                    value: singleReport?.data?.policeStationName || "N/A",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="font-bold text-gray-700 sm:w-1/2 mb-1 sm:mb-0">
                      {item.label}:
                    </span>
                    <span className="sm:w-1/2 text-gray-600">{item.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hasSearched && isError && (
            <motion.div
              className="p-4 mb-4 text-red-700 rounded-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="font-semibold">{message}!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SearchReportStatus;
