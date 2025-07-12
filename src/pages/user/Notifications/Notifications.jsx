import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { imagesPath } from "../../../utils/Images.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchUserNotifications,
  markAsRead,
  removeNotification,
  removeAllUserNotifications,
} from "../../../app/features/notifications/notificationSlice.js";
import HashLoader from "react-spinners/HashLoader";
import { onMessageListener } from "../../../config/firebase.js";

const logo = imagesPath.find((img) => img.id === 16)?.url;

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userNotifications, loading, error } = useSelector(
    (state) => state.notification
  );
  const { user } = useSelector((state) => state.auth);
  const [cardsToShow, setCardsToShow] = useState(6);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [openedCards, setOpenedCards] = useState(new Set());
  const [prevNotificationCount, setPrevNotificationCount] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  useEffect(() => {
    if (user._id) {
      dispatch(fetchUserNotifications(user._id));
    }
  }, [dispatch, user._id]);

  useEffect(() => {
    if (userNotifications?.length > prevNotificationCount) {
      toast.info("You have new notifications!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    setPrevNotificationCount(userNotifications?.length || 0);
  }, [userNotifications]);

  // Listen for incoming messages and show a toast notification
  useEffect(() => {
    const setupMessageListener = async () => {
      try {
        const payload = await onMessageListener();
        // Show toast notification
        toast.info(`New notification: ${payload.notification.title}`, {
          position: "top-right",
          autoClose: 5000,
        });

        // Optionally, refetch notifications to update the list
        dispatch(fetchUserNotifications());
      } catch (error) {
        console.error("Error in onMessageListener:", error);
      }
    };

    setupMessageListener();
  }, [dispatch]);

  const formatToPakistaniTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const loadMoreCards = () => {
    if (cardsToShow < userNotifications.length) {
      setCardsToShow((prev) => prev + 2);
    } else {
      toast.info("No more notifications to load!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleCardClick = (card) => {
    if (!card.isRead) {
      dispatch(markAsRead(card._id));
      // Update local opened state to reflect read status visually
      setOpenedCards((prev) => new Set(prev).add(card._id));
    }
    navigate(`/notifications/${card._id}`);
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirm(id);
    setIsDeleteModalOpen(true);
  };

  const handleClearAllClick = () => {
    setIsDeleteAllModalOpen(true);
  };

  const closeModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirm(null);
  };

  const closeDeleteAllModal = () => {
    setIsDeleteAllModalOpen(false);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(removeNotification(deleteConfirm)).unwrap();
      toast.success("Notification deleted successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete notification", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsDeleting(false);
      closeModal();
    }
  };

  const confirmDeleteAll = async () => {
    setIsDeletingAll(true);
    try {
      await dispatch(removeAllUserNotifications()).unwrap();
      toast.success("All notifications cleared!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete all notifications", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsDeletingAll(false);
      closeDeleteAllModal();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#173F5C" loading={loading} size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <button onClick={() => dispatch(fetchUserNotifications())}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4">
      <ToastContainer />
      <div className="font-inter mb-4 text-sm sm:text-md grid grid-cols-1 gap-4 sm:ms-[40%] md:ms-[30%] lg:ms-[22%] xl:text-lg xl:ms-[22%]">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-2xl font-extrabold">Notifications</h1>
          <button
            className="text-cyan-300 px-4 py-2 hover:opacity-70 font-inter"
            onClick={handleClearAllClick}
          >
            Clear all
          </button>
        </div>

        {Array.isArray(userNotifications) && userNotifications.length === 0 ? (
          <div className="text-center text-black">
            <p className="text-center font-inter text-red-500">
              No notifications available!
            </p>
          </div>
        ) : (
          Array.isArray(userNotifications) &&
          userNotifications.slice(0, cardsToShow).map((card) => (
            <div
              key={card._id}
              className={`flex items-center rounded-sm shadow-xl p-4 cursor-pointer border ${
                card.isRead || openedCards.has(card._id)
                  ? "bg-gray-100"
                  : "bg-gray-200"
              }`}
              onClick={() => handleCardClick(card)}
            >
              <div className="flex-shrink-0">
                <img src={logo} className="w-14" alt="Logo" />
              </div>
              <div className="ml-4 flex-grow">
                <p className="text-gray-700 mt-0">
                  {card.title.length > 30
                    ? `${card.title.slice(0, 30)}...`
                    : card.title}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {formatToPakistaniTime(card.createdAt)}
                </p>
              </div>
              <div className="ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(card._id);
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-cyan-300"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11 2C10.4477 2 10 2.44772 10 3V4H14V3C14 2.44772 13.5523 2 13 2H11ZM16 4V3C16 1.34315 14.6569 0 13 0H11C9.34315 0 8 1.34315 8 3V4H3C2.44772 4 2 4.44772 2 5C2 5.55228 2.44772 6 3 6H3.10496L4.80843 21.3313C4.97725 22.8506 6.26144 24 7.79009 24H16.2099C17.7386 24 19.0228 22.8506 19.1916 21.3313L20.895 6H21C21.5523 6 22 5.55228 22 5C22 4.44772 21.5523 4 21 4H16ZM18.8827 6H5.11726L6.7962 21.1104C6.85247 21.6169 7.28054 22 7.79009 22H16.2099C16.7195 22 17.1475 21.6169 17.2038 21.1104L18.8827 6ZM10 9C10.5523 9 11 9.44771 11 10V18C11 18.5523 10.5523 19 10 19C9.44772 19 9 18.5523 9 18V10C9 9.44771 9.44772 9 10 9ZM14 9C14.5523 9 15 9.44771 15 10V18C15 18.5523 14.5523 19 14 19C13.4477 19 13 18.5523 13 18V10C13 9.44771 13.4477 9 14 9Z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}

        {userNotifications.length > cardsToShow && (
          <div className="flex justify-center items-center">
            <button
              className="w-full hover:opacity-80 bg-custom-teal text-white py-2 px-4 rounded-full shadow-md mt-4 md:w-2/6 sm:w-2/6 lg:w-1/6 xl:w-1/6"
              onClick={loadMoreCards}
            >
              See More
            </button>
          </div>
        )}
      </div>

      {/* Delete Single Notification Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex flex-col items-center">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Delete Notification
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this notification? This
                    action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 sm:col-start-2 sm:text-sm ${
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

      {/* Delete All Notifications Modal */}
      {isDeleteAllModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex flex-col items-center">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Delete All Notifications
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This will permanently delete all notifications. This action
                    cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="button"
                onClick={confirmDeleteAll}
                disabled={isDeletingAll}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-1 focus:ring-red-500 sm:col-start-2 sm:text-sm ${
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

export default Notifications;
