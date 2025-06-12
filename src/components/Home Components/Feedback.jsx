import { useForm } from "react-hook-form";
import { FaUser, FaCalendar, FaComment, FaEnvelope } from "react-icons/fa"; // Added FaEnvelope for email icon
import { useDispatch, useSelector } from 'react-redux';
import { createFeedback } from '../../app/features/feedback/feedbackSlice.js';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.feedback);

  const onSubmit = (data) => {
    dispatch(createFeedback(data))
      .unwrap()
      .then(() => {
        toast.success("Thank you for your feedback!");
        console.log(data);
        
        reset();
      })
      .catch((err) => {
        toast.error("Failed to submit feedback: " + err.message); 
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader size={50} color="#173F5C" />
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto p-6 bg-gray-100 rounded-lg shadow-xl my-4 sm:mt-10 sm:w-4/5 md:max-w-lg lg:max-w-lg border border-[#c2c8d0]">
      <h2 className="text-2xl font-extrabold font-poppins mb-4 text-center sm:text-3xl lg:text-2xl xl:text-2xl">
        Send Feedback
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div className="relative">
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1 font-inter"
          >
            Name
          </label>
          <div className="flex items-center">
            <FaUser className="absolute left-3 text-custom-teal" />
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`w-full pl-10 p-3 border rounded focus:outline-none font-inter text-sm focus:border-custom-teal ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your Name"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="relative">
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1 font-inter"
          >
            Email
          </label>
          <div className="flex items-center">
            <FaEnvelope className="absolute left-3 text-custom-teal" /> 
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: "Invalid email address",
                },
              })}
              className={`w-full pl-10 p-3 border rounded focus:outline-none font-inter text-sm focus:border-custom-teal ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your Email"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Date Field */}
        <div className="relative">
          <label
            htmlFor="date"
            className="block text-sm font-medium mb-1 font-inter"
          >
            Date
          </label>
          <div className="flex items-center">
            <FaCalendar className="absolute left-3 text-custom-teal" />
            <input
              type="date"
              id="date"
              defaultValue={new Date().toISOString().split('T')[0]} // This sets today's date
              {...register("date", { required: "Date is required" })}
              className={`w-full pl-10 p-3 border focus:border-custom-teal rounded focus:outline-none font-inter text-sm ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Feedback Type Dropdown */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium mb-1 font-inter"
          >
            Type of Feedback
          </label>
          <select
            id="type"
            {...register("type", {
              required: "Feedback type is required!",
            })}
            className={`w-full p-3 border rounded focus:outline-none focus:border-custom-teal font-inter text-sm ${
              errors.type ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="" disabled>
              Select a type
            </option>
            <option value="general">General</option>
            <option value="suggestion">Suggestion</option>
            <option value="report issue">Report Issue</option>
            <option value="query">Query</option>
            <option value="user support">User Support</option>
            <option value="complaint">Complaint</option>
            <option value="report issue">Report Issue</option>
            <option value="other">Other</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-xs mt-1">
              {errors.type.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="relative">
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <div className="flex items-center">
            <FaComment className="absolute left-3 text-custom-teal" />
            <textarea
              id="message"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters long",
                },
              })}
              className={`w-full pl-10 p-3 border rounded focus:outline-none font-inter text-sm focus:border-custom-teal ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              rows="4"
              placeholder="Type a message..."
            ></textarea>

          </div>
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.message.message}
            </p>
          )}
        </div>
        <div className="md:text-center">
          <button
            type="submit"
            className="w-full bg-custom-teal text-white py-2 rounded-full hover:opacity-90 focus:ring focus:ring-blue-300 transition font-inter shadow-lg md:w-3/6"
            disabled={loading}
          >
            {loading ? (
              <HashLoader size={20} color="#ffffff" /> 
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;