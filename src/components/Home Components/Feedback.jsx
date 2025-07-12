import { useForm } from "react-hook-form";
import { FaUser, FaCalendar, FaComment, FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { createFeedback } from '../../app/features/feedback/feedbackSlice.js';
import { HashLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-xl my-4 sm:my-8 md:max-w-lg lg:max-w-xl xl:max-w-2xl border border-[#c2c8d0]"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-2xl font-extrabold font-poppins mb-6 text-center sm:text-3xl lg:text-3xl xl:text-3xl text-gray-800"
      >
        Send Feedback
      </motion.h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Field */}
        <motion.div variants={itemVariants} className="relative">
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1 font-inter text-gray-700"
          >
            Name
          </label>
          <div className="flex items-center">
            <FaUser className="absolute left-3 text-custom-teal" />
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`w-full pl-10 p-3 border rounded focus:outline-none font-inter text-sm focus:border-custom-teal transition-all duration-200 ${
                errors.name ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
              placeholder="Your Name"
            />
          </div>
          {errors.name && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.name.message}
            </motion.p>
          )}
        </motion.div>

        {/* Email Field */}
        <motion.div variants={itemVariants} className="relative">
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1 font-inter text-gray-700"
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
              className={`w-full pl-10 p-3 border rounded focus:outline-none font-inter text-sm focus:border-custom-teal transition-all duration-200 ${
                errors.email ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
              placeholder="Your Email"
            />
          </div>
          {errors.email && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.email.message}
            </motion.p>
          )}
        </motion.div>

        {/* Date Field */}
        <motion.div variants={itemVariants} className="relative">
          <label
            htmlFor="date"
            className="block text-sm font-medium mb-1 font-inter text-gray-700"
          >
            Date
          </label>
          <div className="flex items-center">
            <FaCalendar className="absolute left-3 text-custom-teal" />
            <input
              type="date"
              id="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              {...register("date", { required: "Date is required" })}
              className={`w-full pl-10 p-3 border focus:border-custom-teal rounded focus:outline-none font-inter text-sm transition-all duration-200 ${
                errors.date ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
            />
          </div>
          {errors.date && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.date.message}
            </motion.p>
          )}
        </motion.div>

        {/* Feedback Type Dropdown */}
        <motion.div variants={itemVariants}>
          <label
            htmlFor="type"
            className="block text-sm font-medium mb-1 font-inter text-gray-700"
          >
            Type of Feedback
          </label>
          <select
            id="type"
            {...register("type", {
              required: "Feedback type is required!",
            })}
            className={`w-full p-3 border rounded focus:outline-none focus:border-custom-teal font-inter text-sm transition-all duration-200 ${
              errors.type ? "border-red-500" : "border-gray-300 hover:border-gray-400"
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
            <option value="other">Other</option>
          </select>
          {errors.type && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.type.message}
            </motion.p>
          )}
        </motion.div>

        {/* Message Field */}
        <motion.div variants={itemVariants} className="relative">
          <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700">
            Message
          </label>
          <div className="flex items-center">
            <FaComment className="absolute left-3 top-10 text-custom-teal" />
            <textarea
              id="message"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters long",
                },
              })}
              className={`w-full pl-10 p-3 border rounded focus:outline-none font-inter text-sm focus:border-custom-teal transition-all duration-200 ${
                errors.message ? "border-red-500" : "border-gray-300 hover:border-gray-400"
              }`}
              rows="5"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          {errors.message && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.message.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="md:text-center pt-2"
        >
          <motion.button
            type="submit"
            className="w-full bg-custom-teal text-white py-3 rounded-full hover:opacity-90 focus:ring-2 focus:ring-blue-300 transition font-inter shadow-lg md:w-2/5 hover:shadow-xl active:scale-95"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <HashLoader size={20} color="#ffffff" />
            ) : (
              'Submit Feedback'
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default FeedbackForm;