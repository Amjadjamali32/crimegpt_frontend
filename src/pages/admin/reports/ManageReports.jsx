import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { 
  fetchAllAdminReports, 
  fetchSingleAdminReport,
  deleteAdminReport,
  deleteAllAdminReports,
  resetState,
} from "../../../app/features/reports/reportSlice.js";

const ReportsTable = () => {
  const dispatch = useDispatch();
  const { 
    reports = [], 
    isLoading, 
    isError, 
    message,
    isDeleted,
    isDeletedAll,
  } = useSelector((state) => state.report);
  
  const [showModal, setShowModal] = useState(false);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReports, setFilteredReports] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true); // Add this state

  // Fetch reports on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllAdminReports()).unwrap();
        toast.success("Reports fetched successfully");
      } catch (error) {
        toast.error(error.message || "Failed to fetch reports");
      } finally {
        setInitialLoad(false);
      }
    };
    
    fetchData();
    
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

   // Handle success/error messages
   useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(resetState());
    }
    
    if (isDeleted) {
      toast.success("Report deleted successfully");
      dispatch(resetState());
    }
    
    if (isDeletedAll) {
      toast.success("All reports cleared successfully");
      dispatch(resetState());
    }
  }, [isError, isDeleted, isDeletedAll, message, dispatch]);

  
// Add cleanup when component unmounts
useEffect(() => {
  return () => {
    dispatch(resetState());
  };
}, [dispatch]);

  // Handle search functionality
  useEffect(() => {
    if (!Array.isArray(reports)) {
      console.error('Reports is not an array:', reports);
      setFilteredReports([]);
      return;
    }
  
    if (searchTerm) {
      const filtered = reports.filter((report) =>
        (report.caseNumber?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (report.crimeLocation?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (report.incidentType?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (report.reportStatus?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
      setFilteredReports(filtered);
    } else {
      setFilteredReports(reports);
    }
  }, [searchTerm, reports]);

  // Delete single report
  const handleDelete = () => {
    if (selectedReportId) {
      dispatch(deleteAdminReport(selectedReportId))
        .unwrap()
        .then(() => {
          setShowModal(false);
        })
        .catch(error => {
          toast.error(error.message || "Failed to delete report");
        });
    }
  };

  // Delete all reports
  const handleClearAllReports = () => {
    dispatch(deleteAllAdminReports())
      .unwrap()
      .then(() => {
        setShowClearAllModal(false);
      })
      .catch(error => {
        toast.error(error.message || "Failed to clear all reports");
      });
  };

  // View report details
  const handleViewReport = (reportId) => {
    dispatch(fetchSingleAdminReport(reportId))
      .unwrap()
      .catch((error) => {
        toast.error(error.message || 'Failed to load report details');
      });
  };

  // Table columns configuration
  const columns = [
    { 
      name: "#", 
      selector: (row, index) => index + 1, 
      sortable: true,
      width: "70px" 
    },
    { 
      name: "Case Number", 
      selector: (row) => row.caseNumber?.length > 4 ? `${row.caseNumber.slice(0, 4)}...` : row.caseNumber || "N/A", 
      sortable: true 
    },    
    { 
      name: "Location", 
      selector: (row) => row.crimeLocation?.length > 6 ? `${row.crimeLocation.slice(0, 6)}...` : row.crimeLocation || "N/A", 
      sortable: true 
    },    
    { 
      name: "Type", 
      selector: (row) => row.incidentType?.trim() || "N/A", 
      sortable: true 
    },    
    {
      name: "Status",
      cell: (row) => {
        const status = row.reportStatus?.toLowerCase() || '';
        const statusClasses = {
          pending: "bg-blue-500",
          rejected: "bg-red-500",
          investigating: "bg-orange-500",
          closed: "bg-gray-500",
          default: "bg-green-500"
        };
        
        return (
          <div className={`px-4 py-2 rounded-full text-center font-inter text-white ${
            statusClasses[status] || statusClasses.default
          }`}>
            {row.reportStatus || "Unknown"}
          </div>
        );
      },
      sortable: true,
    },    
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Link to={`/EditReports/${row._id}`}>
            <button title="Edit" className="p-1 hover:bg-gray-100 rounded">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </Link>
          <button 
            onClick={() => {
              setSelectedReportId(row._id);
              setShowModal(true);
            }} 
            title="Delete"
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <Link 
            to={`/reports/${row._id}`} 
            onClick={() => handleViewReport(row._id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <button title="View">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </Link>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "150px"
    },
  ];

  // Custom table styles
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#173F5C",
        color: "#ffffff",
        fontSize: "14px"
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        fontSize: "15px"
      },
    },
    rows: {
      style: {
        minHeight: "60px",
        '&:not(:last-of-type)': {
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
  };

  // Loading state - modified
  if (initialLoad || (isLoading && reports.length === 0)) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <HashLoader color="#173F5C" loading={true} size={60} />
      </div>
    );
  }

  return (
    <div className="pt-20 sm:ms-64 sm:w-96 md:w-[65%] lg:w-[77%] xl:w-[79%] font-inter">
      {isLoading && filteredReports.length === 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <HashLoader color="#173F5C" loading={true} size={60} />
        </div>
      )}
      
      <div className="container mx-auto p-4">
        {/* Header Section */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-800">Manage Reports</h1>
            <div className="relative mt-3 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="#173F5C" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full px-10 text-sm py-2.5 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col md:flex-row md:items-center md:justify-end space-y-2 md:space-y-0 md:space-x-4">
            <button 
              onClick={() => reports.length > 0 ? setShowClearAllModal(true) : toast.info("No reports to clear")}
              className="px-4 py-2 text-sm text-cyan-400"
              disabled={isLoading}
            >
              Clear All
            </button>
            <Link to="/addReport">
              <button className="px-4 py-2 text-sm bg-custom-teal text-white rounded-lg hover:opacity-75 transition-colors">
                Add New Report
              </button>
            </Link>
          </div>
        </div>

        {/* DataTable */}
        {isError && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {message}
          </div>
        )}
        
        <div className="bg-white shadow overflow-hidden">
          <DataTable 
            columns={columns} 
            data={filteredReports} 
            pagination 
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            highlightOnHover
            striped
            customStyles={customStyles}
            progressPending={isLoading && filteredReports.length > 0}
            progressComponent={
              <div className="py-8 flex justify-center">
                <HashLoader color="#173F5C" size={60} />
              </div>
            }
            noDataComponent={
              <div className="py-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No reports found!</h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm ? "Try a different search term" : "Get started by adding a new report"}
                </p>
                <div className="mt-6">
                  <Link to="/addReport">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-custom-teal hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                      <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      New Report
                    </button>
                  </Link>
                </div>
              </div>
            }
          />
        </div>
      </div>

      {/* Delete Single Report Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex flex-col items-center">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Report</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this report? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="button"
                onClick={handleDelete}
                disabled={isLoading}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 sm:col-start-2 sm:text-sm ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                disabled={isLoading}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-custom-teal sm:mt-0 sm:col-start-1 sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Reports Modal */}
      {showClearAllModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex flex-col items-center">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Delete All Reports</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This will permanently delete all reports. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="button"
                onClick={handleClearAllReports}
                disabled={isLoading}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 sm:col-start-2 sm:text-sm ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Deleting..." : "Delete All"}
              </button>
              <button
                type="button"
                onClick={() => setShowClearAllModal(false)}
                disabled={isLoading}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-custom-teal sm:mt-0 sm:col-start-1 sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsTable;