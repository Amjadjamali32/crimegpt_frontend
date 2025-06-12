import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { HashLoader } from "react-spinners";
import { imagesPath } from "../utils/Images.js"; 
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../app/features/auth/authSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { resetState } from "../app/features/auth/authSlice.js";

const logo = imagesPath.find((img) => img.id === 16)?.url;

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { isSuccess, message, isError } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      toast.success("Password reset link sent successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/");
        reset();
      }, 3000);
    }
  
    if (isError && message) { 
      toast.dismiss();
      toast.error(message || "Failed to send reset link!", {
        position: "top-right",
        autoClose: 3000,
      });
      dispatch(resetState()); 
    }
  }, [isSuccess, isError, message, reset, navigate, dispatch]);

  const onSubmit = async (data) => {
    if (data.email) {
      setLoading(true);
  
      // Delay API call by 1 second
      setTimeout(async () => {
        try {
          await dispatch(forgotPassword(data.email));
          setLoading(false);
        } catch (err) {
          setLoading(false);
          console.error("Error sending password reset link:", err);
        }
      }, 1000); 
    } else {
      toast.error("Please enter a valid email address!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="pt-12 sm:pt-16 md:pt-14 lg:pt-16 xl:pt-20">
      <div className="w-11/12 mx-auto my-8 p-6 bg-gray-100 rounded-lg shadow-xl border border-[#c2c8d0] font-inter sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-4/12">
        {/* Logo */}
        <div className="flex justify-center my-2 sm:mt-0">
          <img src={logo} alt="Project Logo" className="w-2/6 sm:w-[80px] lg:w-[70px]" />
        </div>

        <h2 className="text-2xl mb-4 text-center font-extrabold text-custom-teal lg:text-xl">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-custom-teal">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border border-[#c2c8d0] rounded-md focus:outline-none focus:ring-1 focus:ring-custom-teal py-3 lg:py-3 xl:py-4 shadow-md text-sm"
              placeholder="Email address"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address!",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full py-3 lg:py-3 xl:py-4 text-white rounded-md text-sm shadow-md ${
                loading ? "bg-gray-400" : "bg-custom-teal hover:opacity-90 my-3"
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 lg:text-sm xl:text-sm">
            Remembered Your Password?{" "}
            <a href="/login" className="text-custom-teal hover:opacity-90">
              Log In
            </a>
          </p>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
          <HashLoader size={50} color="#173F5C" loading={loading} />
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
