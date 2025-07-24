import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchSingleAdminNotification } from "../../../app/features/notifications/notificationSlice";
import { HashLoader } from "react-spinners";

const AdminNotifications = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleNotification, loading, error } = useSelector(
    (state) => state.notification
  );
  
  useEffect(() => {
    dispatch(fetchSingleAdminNotification(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#173F5C" size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center mt-10 text-xl">
        Error: {error.message || error.toString()}
      </div>
    );
  }

  if (!singleNotification) {
    return <div className="text-center mt-10">Notification not found</div>;
  }

  return (
    <div className="pt-20 p-1 font-inter">
      <div className="bg-white mb-4 sm:ms-[41%] sm:w-[58%] md:ms-[35%] md:w-[64%] lg:ms-[24%] lg:w-[72%] xl:ms-[20%] xl:w-[75%] border shadow-lg p-6 rounded-sm">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Notification Details</h2>
          <Link
            to="/manage-notifications"
            className="text-custom-teal hover:underline text-md font-semibold"
          >
            Back to Notifications
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-5">
          <div>
            <span className="font-bold">Case Number: </span>
            <span>{singleNotification?.data?.caseNumber}</span>
          </div>
          <div>
            <span className="font-bold">Title: </span>
            <span>{singleNotification?.data?.title}</span>
          </div>
          <div>
            <span className="font-bold">Severity: </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              singleNotification?.data?.severityLevel === 'high' 
                ? 'bg-red-600 text-white' 
                : singleNotification?.data?.severityLevel === 'medium' 
                  ? 'bg-yellow-400 text-white' 
                  : 'bg-green-500 text-white'
            }`}>
              {singleNotification?.data?.severityLevel}
            </span>
          </div>
          <div>
            <span className="font-bold">Date: </span>
            <span>{new Date(singleNotification?.data?.createdAt).toLocaleString()}</span>
          </div>
          <div className="pt-2">
            <h3 className="font-bold mb-2">Message:</h3>
            <p className="whitespace-pre-line">{singleNotification?.data?.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;