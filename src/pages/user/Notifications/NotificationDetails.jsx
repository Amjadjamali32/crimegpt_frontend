import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleNotification } from "../../../app/features/notifications/notificationSlice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userNotifications, singleNotification } = useSelector((state) => state.notification);

    // Find the selected notification in the userNotifications array
    const selectedNotification = userNotifications.find((notification) => notification._id === id);

    useEffect(() => {
        // If the notification is not in userNotifications, fetch it
        if (!selectedNotification && !singleNotification) {
            dispatch(fetchSingleNotification(id))
                .unwrap()
                .catch((err) => {
                    console.error("Error fetching notification:", err);
                    toast.error("Failed to fetch notification. Please try again later.", {
                        position: "top-right",
                        autoClose: 5000,
                    });
                });
        }
    }, [dispatch, id, selectedNotification, singleNotification]);

    // Use the selectedNotification or singleNotification
    const notification = selectedNotification || singleNotification;

    if (!notification) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Notification not found.</p>
            </div>
        );
    }

    return (
        <div className="pt-20 px-4">
            <ToastContainer />
            <div className="max-w-2xl mx-auto">
                <button onClick={() => navigate(-1)} className="text-cyan-500 hover:underline">
                    &larr; Back to Notifications
                </button>
                <h1 className="text-2xl font-bold mt-4">{notification.title}</h1>
                <p className="text-gray-700 mt-2">{notification.body}</p>
                <p className="text-sm text-gray-500 mt-4">
                    Date: {new Date(notification.createdAt).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default NotificationDetails;