import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../../app/features/auth/authSlice.js";
import { updateAccountDetails, updatePassword } from "../../../app/features/user/userSlice.js";
import HashLoader from "react-spinners/HashLoader";
import { FaCheck } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa"; 

const Setting = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { user, isLoading } = useSelector((state) => state.auth);

  // Form Hooks for Personal Info with default values
  const {
    register: registerPersonalInfo,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors },
    reset: resetPersonalInfo,
  } = useForm({
    defaultValues: {
      name: user?.fullname || "",
      email: user?.email || "",
      nic: user?.NICNumber || "",
    }
  });

  // Form Hooks for Password Update
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm();

  // Fetch user data and reset form values when user data changes
  useEffect(() => {
    let loaderTimeout;

    if (isLoading) {
      loaderTimeout = setTimeout(() => {}, 500);
    }

    dispatch(getCurrentUser())
      .unwrap()
      .then((userData) => {
        // Reset form with user data when fetched
        resetPersonalInfo({
          name: userData.fullname || "",
          email: userData.email || "",
          nic: userData.NICNumber || "",
        });
        clearTimeout(loaderTimeout);
      })
      .catch(() => {
        clearTimeout(loaderTimeout);
      });

    return () => clearTimeout(loaderTimeout);
  }, [dispatch, resetPersonalInfo]);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedImageFile(file);
    }
  };

  // Handle Personal Info Form Submission
  const handlePersonalInfoSubmit = useCallback(
    (data) => {
      setIsUpdating(true);
      const formData = new FormData();
      formData.append("fullname", data.name);
      formData.append("email", data.email);
      formData.append("NICNumber", data.nic);
      if (selectedImageFile) {
        formData.append("profileImage", selectedImageFile);
      }

      dispatch(updateAccountDetails({ userId: user._id, userData: formData }))
        .unwrap()
        .then(() => {
          toast.success("Personal information updated successfully!");
          // Refresh user data after update
          dispatch(getCurrentUser());
        })
        .catch((error) => {
          toast.error(error.message || "Failed to update personal information");
        })
        .finally(() => {
          setIsUpdating(false);
        });
    },
    [selectedImageFile, dispatch, user]
  );

  // Handle Password Update Form Submission
  const handlePasswordUpdateSubmit = useCallback(
    (data) => {
      setIsUpdating(true);
      dispatch(
        updatePassword({
          userId: user._id,
          passwordData: {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
          },
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Password updated successfully!");
          resetPassword(); // Clear password form after successful update
        })
        .catch((error) => {
          toast.error(error.message || "Failed to update password");
        })
        .finally(() => {
          setIsUpdating(false);
        });
    },
    [dispatch, user, resetPassword]
  );

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Convert the API date response into local date and time format
  const utcDateString = user?.createdAt;
  const localDateTime = new Date(utcDateString).toLocaleString("en-PK", {
    timeZone: "Asia/Karachi",
    hour12: true,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="pt-20 pb-4 px-4 font-inter">
      {/* Loader */}
      {(isLoading || isUpdating) && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
          <HashLoader size={50} color="#173F5C" loading={isLoading || isUpdating} />
        </div>
      )}

      {/* Main Content */}
      <div className="shadow-sm rounded bg-gray-200 sm:ms-[40%] sm:w-[61%] md:ms-[30%] md:w-[80%] lg:ms-[30%] lg:w-[60%] xl:ms-[30%] xl:w-[58%]">
        <div className="p-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 text-center">
            Account Settings
          </h1>

          {/* Personal Info Form */}
          <form onSubmit={handlePersonalSubmit(handlePersonalInfoSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5 md:grid-cols-3 justify-center items-center">
              {/* Left Section: Profile Image */}
                <div className="flex items-center justify-center w-40 h-40 mx-auto sm:w-52 sm:h-52">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="User Preview"
                      className="w-full h-full shadow-lg rounded-full object-cover bg-white border-2 border-custom-teal"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full shadow-lg rounded-full bg-custom-gray border-2 border-custom-teal flex items-center justify-center overflow-hidden">
                      {(!user?.profileImage || imageError) ? (
                        <FaUserCircle className="h-full w-full text-custom-teal" />
                      ) : (
                        <img
                          src={user.profileImage}
                          alt="Profile"
                          loading="lazy"
                          onError={handleImageError}
                          onLoad={handleImageLoad}
                          className={`w-full h-full object-cover ${imageLoaded ? 'block' : 'hidden'}`}
                        />
                      )}
                    </div>
                  )}
                </div>

              {/* Center Section: User Details */}
              <div className="grid gap-4 text-sm md:px-4 w-full">
                {user && (
                  <div>
                    <p className="font-bold text-lg">{user.fullname}</p>
                    <p className="text-gray-700 mb-2">{user.email}</p>
                    <p className="text-gray-700 break-words w-96">
                      {user.NICNumber}
                    </p>
                  </div>
                )}

                {/* File Input and Button */}
                <div className="flex flex-col justify-between h-full">
                  <div className="flex-grow"></div>
                  <div className="w-[278px] sm:w-48 md:w-56 lg:w-52 mt-auto">
                    <label
                      htmlFor="fileInput"
                      className="bg-custom-teal text-white rounded-sm cursor-pointer text-center hover:bg-[#1b4664] flex items-center justify-center py-2 gap-2 w-4/6 sm:w-5/6"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6"
                      >
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                      </svg>
                      <span>Change Photo</span>
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Right Section: Role and Join Date */}
              <div className="md:hidden sm:hidden hidden px-1 lg:block xl:block text-center">
                <h2 className="font-extrabold mb-2 px-3 py-1 p-2 lg:w-52 lg:px-5 rounded-full border-2 border-custom-teal shadow-md bg-custom-gray">
                  {user?.role}
                </h2>
                <p className="text-center text-sm">Joined At {localDateTime}</p>
              </div>
            </div>

            {/* Personal Information Form Fields */}
            <h2 className="text-lg font-extrabold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...registerPersonalInfo("name", {
                    required: "Full Name is required!",
                  })}
                  className={`focus:outline-custom-teal text-sm rounded-sm py-3 px-3 w-full ${
                    personalErrors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Amjad Ali Jamali"
                />
                {personalErrors.name && (
                  <p className="text-red-500 text-sm">
                    {personalErrors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...registerPersonalInfo("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className={`focus:outline-custom-teal text-sm rounded-sm py-3 px-3 w-full ${
                    personalErrors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="crime@gmail.com"
                />
                {personalErrors.email && (
                  <p className="text-red-500 text-sm">
                    {personalErrors.email.message}
                  </p>
                )}
              </div>

              {/* NIC */}
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="nic"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  NIC
                </label>
                <input
                  type="text"
                  id="nic"
                  {...registerPersonalInfo("nic", {
                    required: "NIC is required",
                    pattern: {
                      value: /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
                      message: "Invalid NIC format. Use XXXXX-XXXXXXX-X",
                    },
                  })}
                  className={`focus:outline-custom-teal text-sm rounded-sm py-3 px-3 w-full ${
                    personalErrors.nic ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="12345-1234567-1"
                />
                {personalErrors.nic && (
                  <p className="text-red-500 text-sm">
                    {personalErrors.nic.message}
                  </p>
                )}
              </div>

              {/* Save Changes */}
              <div className="pt-7 col-span-2 md:col-span-1">
                <button
                  type="submit"
                  className="bg-custom-teal text-white text-sm py-3 w-full rounded-sm hover:bg-[#1b4664] flex items-center justify-center gap-2"
                  disabled={isUpdating}
                >
                  <FaCheck />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </form>

          {/* Password Update Form */}
          <form onSubmit={handlePasswordSubmit(handlePasswordUpdateSubmit)}>
            <h2 className="text-lg font-inter font-extrabold my-3 mb-4">
              Password Update
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Password */}
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="oldPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  {...registerPassword("oldPassword", {
                    required: "Old Password is required",
                  })}
                  className={`text-sm rounded-sm py-3 px-3 w-full focus:outline-custom-teal ${
                    passwordErrors.oldPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                {passwordErrors.oldPassword && (
                  <p className="text-red-500 text-sm">
                    {passwordErrors.oldPassword.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  {...registerPassword("newPassword", {
                    required: "New Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`focus:outline-custom-teal text-sm rounded-sm py-3 px-3 w-full ${
                    passwordErrors.newPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {passwordErrors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {passwordErrors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="col-span-2 md:col-span-1">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...registerPassword("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) => 
                      value === watchPassword("newPassword") || "Passwords do not match",
                  })}
                  className={`focus:outline-custom-teal text-sm rounded-sm py-3 px-3 w-full ${
                    passwordErrors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {passwordErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Save Changes */}
              <div className="pt-7 col-span-2 md:col-span-1">
                <button
                  type="submit"
                  className="bg-custom-teal text-white text-sm py-3 w-full rounded-sm hover:bg-[#1b4664]"
                  disabled={isUpdating}
                >
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;