import { imagesPath } from "../utils/Images.js"; 
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetState } from "../app/features/auth/authSlice.js";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const logo = imagesPath.find((img) => img.id === 16)?.url;

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
  
    // Append all form data except FCM token
    for (let key in data) {
      formData.append(key, data[key]);
    }
  
    // Handle file uploads
    const nicImage = data.NICImage[0]; 
    const profileImage = data.profileImage[0]; 
  
    if (nicImage) formData.append('NICImage', nicImage);
    if (profileImage) formData.append('profileImage', profileImage);
  
    // Dispatch the registration action
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss()
      toast.success("Registration Successful! Please check Your email"); 
      setTimeout(() => {
        navigate("/");
        dispatch(resetState());
        reset(); 
      }, 3000); 
    }
    if (isError) {
      toast.error(message);
      dispatch(resetState());
    }
  }, [isSuccess, isError, message, dispatch, reset, navigate]);

  return (
    <div className="pt-16 md:pt-20">
      <div className="flex justify-center items-center min-h-screen mx-3">
        <div className="rounded-lg w-full max-w-3xl p-8 my-4 shadow-lg bg-gray-100 sm:justify-start sm:iitems-start border border-[#c2c8d0]">
          {/* Logo */}
          <div className="flex justify-start sm:mb-2 lg:justify-start">
            <img
              src={logo}
              alt="Logo"
              className="w-2/6 sm:w-1/12 md:w-1/12 lg:w-[80px] xl:w-[80px] mx-auto mb-4"
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="font-inter">
                <label
                  htmlFor="fullname"
                  className="block mb-2 font-medium text-sm"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  {...register("fullname", {
                    required: "Full Name is required!",
                    minLength: {
                      value: 3,
                      message: "Full Name must be at least 3 characters",
                    },
                  })}
                  className="bg-gray-50 border border-[#c2c8d0] text-sm rounded-sm block w-full p-2.5 shadow-lg py-3 focus:outline-none lg:p-2 lg:py-3 lg:px-4 focus:border-custom-teal"
                  placeholder="Enter Your full name..."
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm">{errors.fullname.message}</p>
                )}
              </div>

              {/* Gender */}
              <div className="font-inter">
                <label
                  htmlFor="gender"
                  className="block mb-2 font-medium text-sm"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  {...register("gender", { required: "Gender is required!" })}
                  className="bg-gray-50 border border-[#c2c8d0] text-sm rounded-sm block w-full p-2.5 shadow-lg py-3 focus:outline-none lg:p-2 lg:py-3 lg:px-4 focus:border-custom-teal"
                >
                  <option value="" className="text-custom-gray">
                    ----Select Gender----
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">{errors.gender.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="font-inter">
                <label
                  htmlFor="email"
                  className="block mb-2 font-medium text-sm"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: "Email is required!" })}
                  className="bg-gray-50 border border-[#c2c8d0] text-sm rounded-sm block w-full p-2.5 shadow-lg py-3 focus:outline-none lg:p-2 lg:py-3 lg:px-4 focus:border-custom-teal"
                  placeholder="crimegpt@gmail.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Mobile No */}
              <div className="font-inter">
                <label
                  htmlFor="mobile"
                  className="block mb-2 font-medium text-sm"
                >
                  Mobile No
                </label>
                <input
                  type="tel"
                  id="mobile"
                  {...register("mobile", {
                    required: "Mobile number is required!",
                    pattern: {
                      value: /^\+92\d{10}$/,
                      message: "Invalid Pakistani mobile number",
                    },
                  })}
                  className="bg-gray-50 border border-[#c2c8d0] text-sm rounded-sm block w-full p-2.5 shadow-lg py-3 focus:outline-none lg:p-2 lg:py-3 lg:px-4 focus:border-custom-teal"
                  placeholder="+92 3262600358"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm">{errors.mobile.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="font-inter">
                <label
                  htmlFor="password"
                  className="block mb-2 font-medium text-sm"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required!",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
                      message:
                        "Password must be at least 8 characters, include one uppercase, one lowercase, and one special character",
                    },
                  })}
                  className="bg-gray-50 border border-[#c2c8d0] text-sm rounded-sm block w-full p-2.5 shadow-lg py-3 focus:outline-none lg:p-2 lg:py-3 lg:px-4 focus:border-custom-teal"
                  placeholder="********"
                  autoComplete="off"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="font-inter">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 font-medium text-sm"
                >
                  Confirm Password
                </label>
                <input type="password" {...register("confirmPassword", {
                  required: "Confirm Password is required!",
                  validate: (value) => value === watch("password") || "Passwords do not match!",
                })}
                className="bg-gray-50 border border-[#c2c8d0] text-sm rounded-sm block w-full p-2.5 shadow-lg py-3 focus:outline-none lg:p-2 lg:py-3 lg:px-4 focus:border-custom-teal" 
                placeholder="Confirm Password" 
                autoComplete="off"
                />
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
              </div>

              {/* NIC Number */}
              <div className="font-inter">
                <label
                  htmlFor="nic"
                  className="block mb-2 font-medium text-sm"
                >
                  NIC Number
                </label>
                <input
                  type="text"
                  id="nic"
                  {...register("NICNumber", {
                    required: "NIC Number is required!",
                    pattern: {
                      value: /^\d{5}-\d{7}-\d{1}$/,
                      message: "Invalid Pakistani NIC number",
                    },
                  })}
                  className="bg-gray-50 border border-[#c2c8d0] text-sm rounded-sm block w-full p-2.5 shadow-lg py-3 focus:outline-none lg:p-2 lg:py-3 lg:px-4 focus:border-custom-teal"
                  placeholder="12345-1234567-1"
                />
                {errors.NICNumber && (
                  <p className="text-red-500 text-sm">{errors.NICNumber.message}</p>
                )}
              </div>

              {/* NIC Front Image */}
              <div className="font-inter">
                <label
                  htmlFor="NICImage"
                  className="block mb-2 font-medium text-sm"
                >
                  NIC Front Side
                </label>
                <input
                  type="file"
                  id="NICImage"
                  {...register("NICImage", { required: "NIC Image is required!" })}
                  className="bg-gray-50 border border-[#c2c8d0] text-sm rounded-sm block w-full p-2.5 shadow-lg py-2 focus:outline-none lg:p-2 lg:px-4 focus:border-custom-teal"
                />
                {errors.NICImage && (
                  <p className="text-red-500 text-sm">{errors.NICImage.message}</p>
                )}
              </div>

              {/* Address */}
              <div className="font-inter">
                <label
                  htmlFor="address"
                  className="block mb-2 font-medium text-sm"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("address", { required: "Address is required!" })}
                  className="bg-gray-50 border border-[#c2c8d0] text-sm rounded-sm block w-full p-2.5 shadow-lg py-3 focus:outline-none lg:p-2 lg:py-3 lg:px-4 focus:border-custom-teal"
                  placeholder="Your present Address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address.message}</p>
                )}
              </div>

              {/* Profile Image */}
              <div className="font-inter">
                <label
                  htmlFor="profileImage"
                  className="block mb-2 font-medium text-sm"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  id="profileImage"
                  {...register("profileImage", {
                    required: "Profile Image is required!",
                  })}
                  className="bg-gray-50 border border-[#c2c8d0] text-sm rounded-sm block w-full p-2.5 shadow-lg py-2 focus:outline-none lg:p-2 lg:px-4 focus:border-custom-teal"
                />
                {errors.profileImage && (
                  <p className="text-red-500 text-sm">
                    {errors.profileImage.message}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms", {
                    required: "You must accept the terms and conditions!",
                  })}
                  className="mr-2 accent-custom-teal"
                />
                <label htmlFor="terms" className="text-sm font-inter">
                  I accept the terms and conditions
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-sm">{errors.terms.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-5">
            <button
                type="submit"
                disabled={isLoading} 
                className="w-full bg-custom-teal font-inter text-white rounded-md p-3 shadow-lg hover:opacity-85 disabled:opacity-50"
              >
                Register
              </button>
            </div>
          </form>

          {/* Other Options */}
          <div className="mt-5 flex justify-center items-center">
            <span className="text-sm font-inter">Already have an account? </span>
            <Link
              to="/login"
              className="text-custom-teal mx-1 text-sm font-semibold hover:underline font-inter"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>

      {/* Loader: Centered on the page */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
          <HashLoader size={50} color="#173F5C" loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
