import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { HashLoader } from "react-spinners";
import { FaTrash, FaDownload, FaEye, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllUserReports, deleteUserReport, deleteAllUserReports } from "../../../app/features/reports/reportSlice.js";

const MyReportsView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reportsData = useSelector((state) => state.report?.reports?.reports || []);
  const { isLoading, isError, message } = useSelector(
    (state) => state.report || {}
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [deleteAllConfirmation, setDeleteAllConfirmation] = useState(false);
  const userId = useSelector((state) => state.auth.user?._id);

  // Utility function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fetch reports when the component mounts or userId changes
  useEffect(() => {
    if (userId) {
      const queryParams = { page: 1, limit: 10 };
      dispatch(fetchAllUserReports({ userId, queryParams }))
        .unwrap()
        .then((data) => {
          console.log("Type of reports:", typeof data.reports);
        })
        .catch((error) => console.error("Error fetching reports:", error));
    }
  }, [userId, dispatch]);

  const handleDownload = (reportUrl) => {
    if (reportUrl) {
      window.open(reportUrl, "_blank");
      const link = document.createElement("a");
      link.href = reportUrl;
      link.download = `report_${new Date().toISOString()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Report URL not found.");
    }
  };

  // Handle view
  const handleView = (reportId) => {
    // console.log("Attempting to view report ID:", reportId);
    const report = reportsData.find((report) => report._id === reportId);
    // console.log("Found report:", report);
    if (report) {
      navigate(`/user/reports/${reportId}`, { state: { report } });
    } else {
      console.error("Report not found in reportsData");
    }
  };

  // Handle delete single report
  const handleDelete = async () => {
    if (selectedCase !== null) {
      try {
        await dispatch(deleteUserReport({ userId, reportId: selectedCase })).unwrap();
        toast.success("Report deleted successfully");

        // Fetch reports only after toast is triggered
        const queryParams = { page: 1, limit: 10 };
        dispatch(fetchAllUserReports({ userId, queryParams }));

        setShowModal(false);
      } catch (error) {
        console.error("Failed to delete report:", error);
        toast.error("Failed to delete report! Please try again.");
      }
    }
  };

  // Handle delete all reports
  const handleDeleteAll = async () => {
    try {
      await dispatch(deleteAllUserReports(userId)).unwrap();
      const queryParams = { page: 1, limit: 10 };
      dispatch(fetchAllUserReports({ userId, queryParams }));
      setDeleteAllConfirmation(false);
      toast.success("All reports deleted successfully!");
    } catch (error) {
      console.error("Failed to delete all reports:", error);
      toast.error("Failed to delete all reports. Please try again.");
    }
  };

  // Open delete confirmation modal for a single report
  const openModal = (caseNumber) => {
    setSelectedCase(caseNumber);
    setShowModal(true);
  };

  // Close delete confirmation modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Open delete all confirmation modal
  const openDeleteAllConfirmation = () => {
    setDeleteAllConfirmation(true);
  };

  // Close delete all confirmation modal
  const closeDeleteAllConfirmation = () => {
    setDeleteAllConfirmation(false);
  };

  // Table columns
  const columns = useMemo(
    () => [
      { name: "#", selector: (row, index) => index + 1, center: true },
      { name: "Case Number", selector: (row) => row.caseNumber?.substring(0, 5) + "...", sortable: true },
      { name: "Incident Type", selector: (row) => row.incident_type, sortable: true, center: true },
      {
        name: "Reported At",
        selector: (row) => formatDate(row.reportedDate),
        sortable: true,
        center: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => handleDownload(row.reportPdfUrl)}
              className="text-blue-500 hover:text-blue-700"
              title="Download"
            >
              <FaDownload />
            </button>
            <button
              onClick={() => handleView(row._id)}
              className="text-green-500 hover:text-green-700"
              title="View"
            >
              <FaEye />
            </button>
            <button
              onClick={() => openModal(row._id)}
              className="text-red-500 hover:text-red-700"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    [reportsData]
  );

  // Custom styles for the DataTable
  const customStyles = {
    rows: { style: { minHeight: "50px" } },
    headCells: {
      style: {
        backgroundColor: "#173F5C",
        color: "#ffffff",
        fontWeight: "bold",
      },
    },
    cells: { style: { fontSize: "16px" } },
  };

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
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-red-600 font-bold text-lg">
          Error: {message || "Failed to load reports. Please try again later."}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 sm:ms-64 font-inter">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-extrabold mb-2 text-center">My Reports</h1>
        <div className="flex justify-center sm:justify-between items-center mb-2">
          <div></div>
          <button
            onClick={openDeleteAllConfirmation}
            className="text-cyan-400 font-inter px-4 py-2 rounded mb-4"
          >
            Delete All Reports
          </button>
        </div>

        <DataTable
          columns={columns}
          data={Array.isArray(reportsData) ? reportsData : []}
          pagination
          highlightOnHover
          striped
          customStyles={customStyles}
          className="border border-gray-300 bg-teal-500"
          responsive
        />
      </div>

      {/* Delete Confirmation Modal for a Single Report */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center font-inter">
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <FaExclamationTriangle className="text-red-500 text-4xl" />
            </div>
            <h2 className="text-sm font-inter mb-4">Are you sure you want to delete this report?</h2>
            <div className="flex justify-center space-x-4">
              <button onClick={handleDelete} className="bg-custom-teal hover:opacity-80 text-sm text-white px-8 shadow-md py-1.5 rounded-full">
                Delete
              </button>
              <button onClick={closeModal} className="bg-gray-500 hover:opacity-80 px-8 text-sm text-white py-1.5 shadow-md rounded-full">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Confirmation Modal */}
      {deleteAllConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center font-inter">
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="flex justify-center mb-4">
              <FaExclamationTriangle className="text-red-500 text-4xl" />
            </div>
            <h2 className="text-sm mb-4">Are you sure you want to delete ALL reports?</h2>
            <div className="flex justify-center space-x-4">
              <button onClick={closeDeleteAllConfirmation} className="bg-gray-500 hover:opacity-80 px-10 text-sm text-white py-1.5 shadow-md rounded-full">
                Cancel
              </button>
              <button onClick={handleDeleteAll} className="bg-custom-teal hover:opacity-80 text-sm text-white px-8 shadow-md py-1.5 rounded-full">
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReportsView;