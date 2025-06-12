import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import {
  getAllUsers,
  deleteUser,
  deleteAllUsers,
  resetState,
} from "../../../app/features/user/userSlice.js";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const {
    allUsers,
    isLoading,
    isSuccess,
    isError,
    message,
  } = useSelector((state) => state.user);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [nicSearchTerm, setNicSearchTerm] = useState("");
  const [initialLoad, setInitialLoad] = useState(true); 

  // Fetch users on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllUsers()).unwrap();
        toast.success("Users fetched successfully");
      } catch (error) {
        toast.error(error.message || "Failed to fetch users");
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
    if (isSuccess && message) {
      console.log(message);
      toast.success(message);
      dispatch(resetState());
    }
    if (isError && message) {
      toast.error(message);
      dispatch(resetState());
    }
  }, [isSuccess, isError, message, dispatch]);


  // Delete User
  const handleDelete = () => {
    if (selectedUserId !== null) {
      dispatch(deleteUser(selectedUserId));
      setShowDeleteModal(false);
    }
  };

  // Clear all users
  const handleClearAllUsers = () => {
    dispatch(deleteAllUsers());
    setShowClearAllModal(false);
  };

  // Open modal for deletion confirmation
  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  // Handle search by NIC
  useEffect(() => {
    if (nicSearchTerm && allUsers.length > 0) {
      const filtered = allUsers.filter((user) =>
        user.NICNumber?.toLowerCase().includes(nicSearchTerm.toLowerCase())
      );
      setUsers(filtered);
    } else {
      setUsers(allUsers);
    }
  }, [nicSearchTerm, allUsers]);

  const [users, setUsers] = useState(allUsers);

  // Update users when allUsers changes
  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  // Icons
  const EditIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
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

  const SearchIcon = () => (
    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="#173F5C" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const ProfileIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  // Table Columns
  const columns = [
    { 
      name: "#", 
      selector: (row, index) => index + 1, 
      sortable: true,
      width: "70px"
    },
    {
      name: "Profile",
      cell: (row) => {
        const [imageError, setImageError] = useState(!row.profileImage);
        
        return (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {!imageError && row.profileImage ? (
                <img 
                  src={row.profileImage} 
                  alt={row.fullname} 
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <ProfileIcon />
              )}
            </div>
          </div>
        );
      },
      center: true,
      width: "100px"
    },
    { 
      name: "Name", 
      selector: (row) => row.fullname, 
      sortable: true,
      cell: (row) => <span className="font-medium">{row.fullname}</span>,
      minWidth: "150px"
    },
    { 
      name: "Date Created", 
      selector: (row) => new Date(row.createdAt).toLocaleDateString(), 
      sortable: true,
      minWidth: "120px"
    },
    { 
      name: "Role", 
      selector: (row) => row.role, 
      sortable: true,
      minWidth: "120px"
    },
    { 
      name: "NIC", 
      selector: (row) => row.NICNumber, 
      sortable: true,
      minWidth: "120px"
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center space-x-2">
          <Link to={`/edit-user/${row._id}`} className="text-blue-500 hover:opacity-85">
            <EditIcon />
          </Link>
          <button onClick={() => openDeleteModal(row._id)}>
            <DeleteIcon />
          </button>
        </div>
      ),
      width: "120px",
      center: true
    },
  ];

  // Custom Styles
  const customStyles = {
    rows: {
      style: { 
        minHeight: "50px",
        '&:not(:last-of-type)': {
          borderBottom: '1px solid #e5e7eb',
        },
      },
    },
    headCells: {
      style: {
        backgroundColor: "#173F5C",
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: "14px",
        paddingLeft: "12px",
        paddingRight: "12px",
        '&:nth-child(2)': {
          paddingRight: "40px"
        },
        '&:nth-child(3)': {
          paddingLeft: "30px"
        }
      },
    },
    cells: {
      style: { 
        fontSize: "14px",
        paddingLeft: "12px",
        paddingRight: "12px",
      },
    },
  };

  // Loading state - modified
  if (initialLoad || (isLoading && !users.length)) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <HashLoader color="#173F5C" loading={true} size={60} />
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 sm:ml-64 font-inter">
      <div className="max-w-full overflow-x-auto">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:w-64">
              <input
                type="text"
                placeholder="Search by NIC..."
                value={nicSearchTerm}
                onChange={(e) => setNicSearchTerm(e.target.value)}
                className="w-full px-10 py-2 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-custom-teal mt-2 text-sm"  
              />
              <span className="absolute inset-y-0 left-3 top-2 flex items-center">  
                <SearchIcon />
              </span>
            </div>
            <button
              onClick={() => setShowClearAllModal(true)}
              className="px-4 py-2 text-sm text-cyan-400"
              disabled={!users.length}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* DataTable */}
        <div className="shadow overflow-hidden rounded-lg">
          <DataTable
            columns={columns}
            data={users}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 20, 30]}
            highlightOnHover
            striped
            customStyles={customStyles}
            responsive
            noTableHead={false}
            progressPending={isLoading}
            noDataComponent={
              <div className="py-8 text-center text-gray-500">
                No users found
              </div>
            }
          />
        </div>
      </div>

      {/* Delete User Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex flex-col items-center">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Delete User</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this user? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
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
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isLoading}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:col-start-1 sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Users Modal */}
      {showClearAllModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex flex-col items-center">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Delete All Users</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This will permanently delete all users. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="button"
                onClick={handleClearAllUsers}
                disabled={isLoading}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Deleting..." : "Delete All"}
              </button>
              <button
                type="button"
                onClick={() => setShowClearAllModal(false)}
                disabled={isLoading}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:col-start-1 sm:text-sm"
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

export default ManageUsers;