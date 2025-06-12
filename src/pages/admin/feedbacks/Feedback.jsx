import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllFeedbacks,
  deleteFeedback,
  deleteAllFeedbacks,
} from "../../../app/features/feedback/feedbackSlice.js";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Feedback = () => {
  const dispatch = useDispatch();
  const { feedbacks, loading, error } = useSelector((state) => state.feedback);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  useEffect(() => {
    dispatch(getAllFeedbacks())
      .unwrap()
      .then(() => {
        toast.success("Feedbacks loaded successfully");
      })
      .catch((error) => {
        toast.error(`Failed to load feedbacks: ${error.message}`);
      });
  }, [dispatch]);

  // Format date to Pakistani format (DD/MM/YYYY)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Utility function to truncate text
  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  // Filter feedbacks based on search term
  const filteredFeedbacks = searchTerm
    ? feedbacks.filter((feedback) =>
        feedback.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : feedbacks;

  // Delete Feedback
  const handleDelete = () => {
    if (selectedUserId !== null) {
      setIsDeleting(true);
      dispatch(deleteFeedback(selectedUserId))
        .unwrap()
        .then(() => {
          toast.success("Feedback deleted successfully!");
          setShowModal(false);
        })
        .catch((error) => {
          toast.error(`Failed to delete feedback: ${error?.message}`);
        })
        .finally(() => {
          setIsDeleting(false);
        });
    }
  };

  // Delete All Feedbacks
  const handleDeleteAll = () => {
    setIsDeletingAll(true);
    dispatch(deleteAllFeedbacks())
      .unwrap()
      .then(() => {
        toast.success("All feedbacks deleted successfully!");
        setShowDeleteAllModal(false);
      })
      .catch((error) => {
        toast.error(`Failed to delete all feedbacks: ${error?.message}`);
      })
      .finally(() => {
        setIsDeletingAll(false);
      });
  };

  // Open modal for deletion confirmation
  const openModal = (_id) => {
    setSelectedUserId(_id);
    setShowModal(true);
  };

  // Close modals
  const closeModal = () => setShowModal(false);
  const closeDeleteAllModal = () => setShowDeleteAllModal(false);

  // Handle Clear All button click
  const handleClearAll = () => {
    setSearchTerm(""); // Clear the search term
    setShowDeleteAllModal(true); // Open the Delete All confirmation modal
  };

  // Icons
  const SearchIcon = () => (
    <svg
      className="w-5 h-5 text-gray-500"
      fill="none"
      stroke="#173F5C"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const ViewIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="cyan" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );

  const DeleteIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="red" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );

  // Table Columns
  const columns = [
    {
      name: "#",
      cell: (row, rowIndex) => rowIndex + 1,
      sortable: true,
    },
    {
      name: "Name",
      cell: (row) => (
        <div className="flex items-center">
          <span className="ml-3">{row.name}</span>
        </div>
      ),
      sortable: true,
    },
    { name: "Type", selector: (row) => row.type, sortable: true },
    {
      name: "Reported",
      cell: (row) => formatDate(row.date),
      sortable: true,
    },
    {
      name: "Description",
      cell: (row) => (
        <div className="flex items-center">
          <span className="ml-3">{truncateText(row.message, 3)}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center space-x-2">
          <Link to={`/feedbacks/${row._id}`}>
            <button className="hover:scale-110 transition-transform">
              <ViewIcon />
            </button>
          </Link>
          <button 
            onClick={() => openModal(row._id)}
            className="hover:scale-110 transition-transform"
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  // Custom Styles
  const customStyles = {
    rows: {
      style: { 
        minHeight: "50px",
        '&:hover': {
          backgroundColor: '#f0f9ff',
        }
      },
    },
    headCells: {
      style: {
        backgroundColor: "#173F5C",
        color: "#ffffff",
        fontSize: '14px',
      },
    },
    cells: {
      style: { 
        fontSize: "15px",
        padding: '12px 8px',
      },
    },
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#173F5C" size={60} />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-red-600 text-center mt-10 text-xl">
        Error: {error.message || error.toString()}
      </div>
    );
  }

  return (
    <div className="pt-20 sm:ms-64 sm:w-96 md:w-[65%] lg:w-[74%] xl:w-[79%] font-inter">
      <div className="container mx-auto p-4">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Feedback</h1>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search by Type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-custom-teal text-sm"
              />
            </div>
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-cyan-400 hover:opacity-80 text-sm"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* DataTable */}
        <div className="border border-gray-200 overflow-hidden shadow-sm">
          <DataTable
            columns={columns}
            data={filteredFeedbacks}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            highlightOnHover
            striped
            customStyles={customStyles}
            noDataComponent={
              <div className="p-4 text-center text-gray-600">
                No feedbacks found!
              </div>
            }
          />
        </div>
      </div>

      {/* Delete Feedback Modal */}
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
                <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Feedback</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this feedback? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm ${
                  isDeleting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              <button
                type="button"
                onClick={closeModal}
                disabled={isDeleting}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-custom-teal sm:mt-0 sm:col-start-1 sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Feedbacks Modal */}
      {showDeleteAllModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex flex-col items-center">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Delete All Feedbacks</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This will permanently delete all feedbacks. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="button"
                onClick={handleDeleteAll}
                disabled={isDeletingAll}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm ${
                  isDeletingAll ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isDeletingAll ? "Deleting..." : "Delete All"}
              </button>
              <button
                type="button"
                onClick={closeDeleteAllModal}
                disabled={isDeletingAll}
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

export default Feedback;