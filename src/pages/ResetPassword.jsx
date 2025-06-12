import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { imagesPath } from "../utils/Images.js"; 
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../app/features/auth/authSlice.js"; // Import the resetPassword action

const logo = imagesPath.find((img) => img.id === 16)?.url;

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useParams().token;

  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    setLoading(true);

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-right" });
      setLoading(false);
      return;
    }

    try {
      await dispatch(resetPassword({ token, newPassword: data.password })).unwrap();
      console.log("Password reset successfully!");
      toast.success("Your password has been reset successfully!", {
        position: "top-right",
      });
      navigate("/login");
      reset();
    } catch (error) {
      toast.error(error.message || "Failed to reset password", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 md:pt-24">
      <div className="w-11/12 mx-auto p-6 bg-gray-100 rounded-lg shadow-xl font-inter border border-[#c2c8d0] sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-4/12 my-3">
        
        {/* Logo Section */}
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="w-20 h-20 object-contain" />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center text-custom-teal">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* New Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-custom-teal">
              New Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { 
                required: "Password is required", 
                minLength: { value: 8, message: "Must be at least 8 characters" },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
                  message: "Must contain at least 1 letter, 1 number, and 1 special character"
                }
              })}
              className="mt-1 p-2 w-full border border-[#c2c8d0] rounded-md focus:outline-none focus:ring-1 focus:ring-custom-teal"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-custom-teal">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", { required: "Please confirm your password!" })}
              className="mt-1 p-2 w-full border border-[#c2c8d0] rounded-md focus:outline-none focus:ring-1 focus:ring-custom-teal"
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full py-3 text-white rounded-md ${loading ? "bg-gray-400" : "bg-custom-teal hover:opacity-90"}`}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>

        <div className="my-3 text-center">
          <p className="text-sm text-gray-500">
            Back to{" "}
            <Link to="/login" className="text-custom-teal font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
          <HashLoader size={50} color="#173F5C" />
        </div>
      )}
    </div>
  );
};

export default ResetPassword;