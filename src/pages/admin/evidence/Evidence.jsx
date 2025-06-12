import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  fetchEvidences,
  removeSingleEvidence,
  removeAllEvidences,
  reset,
} from "../../../app/features/evidence/evidenceSlice.js";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";

const Evidence = () => {
  const dispatch = useDispatch();
  const {
    evidences,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.evidence);

  // Access the nested evidences array from the API response structure
  const apiEvidences = evidences?.data?.evidences || [];
  const [caseNumberSearchTerm, setCaseNumberSearchTerm] = useState("");
  const [selectedEvidenceId, setSelectedEvidenceId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  // Fetch evidences on component mount
  useEffect(() => {
    dispatch(fetchEvidences());
  }, [dispatch]);

  // Handle alerts and reset state
  useEffect(() => {
    if (isError) {
      toast.error(message || "Failed to fetch evidences!");
      dispatch(reset());
      setInitialFetchDone(false); 
      return;
    }
  
    if (isSuccess && !initialFetchDone && apiEvidences.length > 0) {
      toast.success(message || "Evidences loaded successfully!");
      dispatch(reset());
      setInitialFetchDone(true); // Only allow this once per page load
    }
  }, [isError, isSuccess, message, dispatch, apiEvidences.length, initialFetchDone]);
  

  // Delete single evidence
  const handleDelete = () => {
    if (selectedEvidenceId) {
      dispatch(removeSingleEvidence(selectedEvidenceId));
      setShowDeleteModal(false);
    }
  };

  // Clear all evidences
  const handleClearAll = () => {
    dispatch(removeAllEvidences());
    setShowClearAllModal(false);
  };

  // Memoized filtered evidences
  const filteredEvidences = useMemo(() => {
    if (!caseNumberSearchTerm) return apiEvidences;
    return apiEvidences.filter(evidence => 
      evidence?.caseNumber?.toLowerCase().includes(caseNumberSearchTerm.toLowerCase())
    );
  }, [apiEvidences, caseNumberSearchTerm]);

  // Add this above your component return (with your other constants)
    const customStyles = {
      headRow: {
        style: {
          backgroundColor: '#173F5C', 
          color: '#ffffff', 
          fontSize: '14px',
        },
      },
      headCells: {
        style: {
          paddingLeft: '8px', // Adjust padding as needed
          paddingRight: '8px',
        },
      },
      cells: {
        style: {
          paddingLeft: '8px', // Match cell padding with header
          paddingRight: '8px',
          fontSize: '14px',
        },
      },
    };

  // Memoized columns configuration
  const columns = useMemo(() => [
    { 
      name: "#", 
      selector: (row, index) => index + 1, 
      sortable: true 
    },
    {
      name: "User Name",
      cell: (row) => (
        <div className="flex items-center">
          <span className="ml-3">
            {row.userId?.fullname || 'N/A'}
          </span>
        </div>
      ),
      sortable: true,
    },
    { 
      name: "Case Number", 
      selector: (row) => row.caseNumber || 'N/A', 
      sortable: true 
    },
    { 
      name: "Type",
      cell: (row) => {
        const displayType = row.type === 'raw' ? 'document' : row.type;
        return displayType ? displayType.charAt(0).toUpperCase() + displayType.slice(1) : 'N/A';
      },
      sortable: true 
    },
    { 
      name: "Submitted Date", 
      selector: (row) => 
        row.createdAt 
          ? new Date(row.createdAt).toLocaleDateString() 
          : 'N/A',
      sortable: true 
    },
    {
      name: "File",
      cell: (row) => (
        <a 
          href={row.evidencefileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View File
        </a>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center space-x-2">
          <Link to={`/evidences/${row._id}`}>
            <button>
              <svg className="w-5 h-5" fill="none" stroke="cyan" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </Link>
          <button
            onClick={() => {
              setSelectedEvidenceId(row._id);
              setShowDeleteModal(true);
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="red" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ),
    },
  ], []);

  // Loading state
  if (isLoading && (!apiEvidences || apiEvidences.length === 0)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#173F5C" size={60} />
      </div>
    );
  }

  return (
    <div className="pt-20 sm:ms-64 sm:w-96 md:w-[65%] lg:w-[77%] xl:w-[79%] font-inter">
      <div className="container mx-auto p-4">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
          <h1 className="text-2xl font-bold">Manage Evidences</h1>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="#173F5C" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by Case Number..."
                value={caseNumberSearchTerm}
                onChange={(e) => setCaseNumberSearchTerm(e.target.value)}
                className="w-full px-11 text-sm py-2 border rounded-md bg-gray-200"
              />
            </div>
            <button
              onClick={() => setShowClearAllModal(true)}
              className="px-4 py-2 text-sm text-cyan-400 rounded-lg hover:opacity-85 w-full sm:w-auto"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* DataTable */}
        <DataTable
          columns={columns}
          data={filteredEvidences}
          progressPending={isLoading && apiEvidences?.length > 0}
          progressComponent={
            <div className="flex justify-center items-center h-64">
              <HashLoader color="#173F5C" size={60} />
            </div>
          }
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
          highlightOnHover
          striped
          customStyles={customStyles}
          noDataComponent={<div className="py-4 text-center">No evidences found</div>}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex flex-col items-center">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Evidence</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this evidence? This action cannot be undone.
                    </p>
                  </div>
              </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1  focus:ring-custom-teal sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isLoading}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Clear All Evidences</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete ALL evidences? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  onClick={() => setShowClearAllModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1  focus:ring-custom-teal sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  disabled={isLoading}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-1  focus:ring-red-500 sm:col-start-2 sm:text-sm ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Clearing..." : "Clear All"}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Evidence;