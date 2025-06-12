import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleFeedback } from "../../../app/features/feedback/feedbackSlice.js";
import { HashLoader } from "react-spinners"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const FeedBackDetails = () => {
  const { id } = useParams(); 
  console.log(id); 
  
  const dispatch = useDispatch();

  // Access the Redux state
  const { feedback, loading, error } = useSelector((state) => state.feedback);

  console.log(feedback);

  // Fetch feedback data when the component mounts
  useEffect(() => {
    dispatch(getSingleFeedback(id))
      .unwrap()
      .then(() => {
        toast.success("Feedback details loaded successfully!");
      })
      .catch((error) => {
        toast.error(`Failed to load feedback details: ${error.message}`);
      });
  }, [id, dispatch]);

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
      <div className="pt-44 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  // Handle case where feedback data is not available
  if (!feedback) {
    return (
      <div className="pt-44 text-center">
        No feedback data found.
      </div>
    );
  }

  return (
    <div className="pt-20 p-1 font-inter">
      <form className="bg-gray-200 mb-4 sm:ms-[41%] sm:w-[58%] md:ms-[35%] md:w-[64%] lg:ms-[25%] lg:w-[72%] xl:ms-[20%] xl:w-[75%] border shadow-lg p-6 rounded-sm">
        <h2 className="text-xl font-bold mb-5 text-center">Feedback Details</h2>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <span className="font-bold">Name: </span>
            <u className="mt-1 no-underline">{feedback?.data?.name}</u>
          </div>
          <div>
            <span className="font-bold">Email: </span>
            <u className="mt-1 no-underline">{feedback?.data?.email}</u>
          </div>
          <div>
            <span className="font-bold">Type: </span>
            <u className="mt-1 no-underline">{feedback?.data?.type}</u>
          </div>
          <div>
            <span className="font-bold">Message: </span>
            <u className="mt-1 no-underline">{feedback?.data?.message}</u>
          </div>
          <div>
            <span className="font-bold">Submitted: </span>
            <u className="mt-1 no-underline">{new Date(feedback?.data?.date).toLocaleDateString("en-PK")}</u>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FeedBackDetails;