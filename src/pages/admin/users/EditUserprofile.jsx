import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getSingleUser,
  updateUser,
} from "../../../app/features/user/userSlice.js";
import { HashLoader } from "react-spinners";
import { FaUser, FaSave } from "react-icons/fa";

const EditUserprofile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleUser, isLoading, isError, message } = useSelector(
    (state) => state.user
  );
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedNICImage, setSelectedNICImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
      NICNumber: "",
      gender: "male",
      role: "user",
      location: "",
      profileImage: null,
      NICImage: null,
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(getSingleUser(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleUser?.data) {
      const userData = singleUser.data;
      reset({
        name: userData.fullname || "",
        email: userData.email || "",
        password: "",
        mobile: userData.mobile || "",
        NICNumber: userData.NICNumber || "",
        gender: userData.gender || "male",
        role: userData.role || "user",
        location: userData.location || "",
      });

      if (userData.profileImage) {
        setSelectedProfileImage(userData.profileImage);
        setValue("profileImage", userData.profileImage);
      }

      if (userData.NICImage) {
        setSelectedNICImage(userData.NICImage);
        setValue("NICImage", userData.NICImage);
      }
    }
  }, [singleUser, reset, setValue]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedProfileImage(URL.createObjectURL(file));
      setValue("profileImage", file);
    }
  };

  const handleNICImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedNICImage(URL.createObjectURL(file));
      setValue("NICImage", file);
    }
  };

  const onSubmit = async (data) => {
    const formDataToSend = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        formDataToSend.append(key, value);
      }
    });

    try {
      await dispatch(
        updateUser({ userId: id, userData: formDataToSend })
      ).unwrap();
      toast.success("User updated successfully!");
      await dispatch(getSingleUser(id));
    } catch (error) {
      toast.error(`Failed to update user: ${error.message}`);
    }
  };

  if (isError) {
    return <div className="pt-44">Error: {message}</div>;
  }

  const currentValues = watch();

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <HashLoader color="#173F5C" size={60} />
        </div>
      )}

      {/* Main container with responsive padding */}
      <div className="pt-20 pb-8 px-4 lg:pl-64 lg:pr-6 min-h-screen bg-gray-50 font-inter">
        {/* Responsive container */}
        <div className="max-w-4xl mx-auto bg-blue-50 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 sm:p-6">
            {/* Profile Section - Stack on small screens, row on larger */}
            <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0 mb-6">
              <div className="flex-shrink-0 flex items-center justify-center border border-custom-teal shadow-md rounded-full w-28 h-28 sm:w-36 sm:h-36 bg-purple-100">
                {selectedProfileImage ? (
                  <img
                    src={selectedProfileImage}
                    alt="User Preview"
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "";
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <FaUser className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500" />
                  </div>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-semibold">
                  {currentValues.name}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  {currentValues.email}
                </p>
              </div>

              <div className="sm:text-right text-center">
                <h2 className="font-extrabold mb-2 px-3 sm:px-4 py-1 rounded-full border-2 border-slate-500 shadow-md bg-custom-gray inline-block text-sm sm:text-base">
                  {currentValues.role}
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Joined {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Personal Info Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Name and Email */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "Name is required!" })}
                    className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password and Mobile */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password (leave blank to keep current)
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("password", {
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="mobile"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Mobile No
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    {...register("mobile", {
                      required: "Mobile No is required",
                      pattern: {
                        value: /^\+92\d{10}$/,
                        message:
                          "Mobile number must start with +92 and be 13 characters long (e.g., +923001234567)",
                      },
                    })}
                    className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                      errors.mobile ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Mobile No (e.g., +923001234567)"
                  />
                  {errors.mobile && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>

                {/* Gender and Role */}
                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    {...register("gender", { required: "Gender is required" })}
                    className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                      errors.gender ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="NICNumber"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    NIC Number
                  </label>
                  <input
                    type="text"
                    id="NICNumber"
                    {...register("NICNumber", {
                      required: "NIC Number is required",
                      pattern: {
                        value: /^\d{13}$|^\d{5}-\d{7}-\d{1}$/,
                        message:
                          "NIC must be 13 digits or in the format XXXXX-XXXXXXX-X",
                      },
                    })}
                    className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                      errors.NICNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="NIC Number"
                  />
                  {errors.NICNumber && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.NICNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="NICImage"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    NIC Picture
                  </label>
                  {selectedNICImage && (
                    <div className="mb-2">
                      <img
                        src={selectedNICImage}
                        alt="Current NIC"
                        className="h-20 w-auto border rounded"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "";
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    id="NICImage"
                    accept="image/*"
                    onChange={handleNICImageChange}
                    className="border text-sm rounded-md py-2 px-4 w-full bg-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedNICImage &&
                    !(currentValues.NICImage instanceof File)
                      ? "Upload a new image to replace the current one"
                      : "Upload NIC image"}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    {...register("role", { required: "Role is required" })}
                    className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                      errors.role ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                {/* Profile Image (full width) */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="profileImage"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Profile Image
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="border text-sm rounded-md py-2 px-4 w-full bg-white"
                  />
                </div>
              </div>

              {/* Save Changes Button (centered) */}
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="bg-custom-teal text-white py-3 px-6 sm:px-8 rounded-full hover:bg-[#1b4664] transition-colors duration-300 shadow-md w-full sm:w-auto flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <HashLoader color="#ffffff" size={20} />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FaSave className="text-lg" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserprofile;
