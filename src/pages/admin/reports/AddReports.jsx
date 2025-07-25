import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addNewAdminReport } from "../../../app/features/reports/reportSlice.js";
import HashLoader from "react-spinners/HashLoader";
import { FaPlus, FaSave } from "react-icons/fa";

const AddReport = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const evidenceFiles = watch("evidenceFiles");

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setIsGettingLocation(true);
      
      try {
        const location = await getCurrentLocation();
        setValue("latitude", location.latitude);
        setValue("longitude", location.longitude);
      } catch (error) {
        console.error("Error getting location:", error);
        toast.warning("Could not get current location. Using default coordinates.");
        setValue("latitude", 0);
        setValue("longitude", 0);
      } finally {
        setIsGettingLocation(false);
      }

      const formData = new FormData();
      
      formData.append("complainant_name", data.complainant_name);
      formData.append("complainant_email", data.complainant_email);
      formData.append("complainant_nic", data.complainant_nic);
      formData.append("mobileNumber", data.mobileNumber);
      formData.append("incident_type", data.incident_type);
      formData.append("location", data.location);
      formData.append("incident_description", data.incident_description);
      formData.append("date", data.date);
      formData.append("latitude", data.latitude || 0);
      formData.append("longitude", data.longitude || 0);
      formData.append("policeStationName", data.policeStationName);
      formData.append("reportStatus", data.reportStatus);

      if (data.evidenceFiles && data.evidenceFiles.length > 0) {
        Array.from(data.evidenceFiles).forEach((file) => {
          formData.append("evidenceFiles", file);
        });
      }
      
      if (data.signatureImage && data.signatureImage[0]) {
        formData.append("signatureImage", data.signatureImage[0]);
      }

      await dispatch(addNewAdminReport(formData)).unwrap();
      
      toast.success("Report submitted successfully!");
      reset();
    } catch (error) {
      toast.error(error.message || "Failed to submit report!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 pb-8 px-4 lg:pl-64 lg:pr-6 min-h-screen bg-gray-100 font-inter relative">
      {/* Loading overlay */}
      {(isSubmitting || isGettingLocation) && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <HashLoader color="#173F5C" loading={true} size={60} />
        </div>
      )}

      {/* Responsive container */}
      <div className="max-w-4xl mx-auto bg-blue-50 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <h2 className="text-xl font-bold mb-6 text-center">Add New Report</h2>

            {/* Grid layout for form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Complainant Name */}
              <div className="md:col-span-2">
                <label htmlFor="complainant_name" className="block mb-2 text-sm font-medium text-gray-900">
                  Complainant Name
                </label>
                <input
                  type="text"
                  id="complainant_name"
                  {...register("complainant_name", { required: "Complainant name is required!" })}
                  className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                    errors.complainant_name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Complainant Name"
                />
                {errors.complainant_name && (
                  <p className="mt-1 text-red-500 text-sm">{errors.complainant_name.message}</p>
                )}
              </div>

              {/* NIC Number */}
              <div>
                <label htmlFor="complainant_nic" className="block mb-2 text-sm font-medium text-gray-900">
                  NIC Number
                </label>
                <input
                  type="text"
                  id="complainant_nic"
                  {...register("complainant_nic", { 
                    required: "NIC Number is required!",
                    pattern: {
                      value: /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
                      message: "Please enter a valid NIC format (XXXXX-XXXXXXX-X)"
                    }
                  })}
                  className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                    errors.complainant_nic ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter NIC Number (XXXXX-XXXXXXX-X)"
                />
                {errors.complainant_nic && (
                  <p className="mt-1 text-red-500 text-sm">{errors.complainant_nic.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="complainant_email" className="block mb-2 text-sm font-medium text-gray-900">
                  Email Address
                </label>
                <input
                  type="email"
                  id="complainant_email"
                  {...register("complainant_email", { 
                    required: "Email is required!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                    errors.complainant_email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Email Address"
                />
                {errors.complainant_email && (
                  <p className="mt-1 text-red-500 text-sm">{errors.complainant_email.message}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  {...register("mobileNumber", { 
                    required: "Mobile Number is required!",
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "Please enter a valid 11-digit mobile number"
                    }
                  })}
                  className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                    errors.mobileNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Mobile Number (e.g., 03001234567)"
                />
                {errors.mobileNumber && (
                  <p className="mt-1 text-red-500 text-sm">{errors.mobileNumber.message}</p>
                )}
              </div>

              {/* Incident Type */}
              <div>
                <label htmlFor="incident_type" className="block mb-2 text-sm font-medium text-gray-900">
                  Incident Type
                </label>
                <select
                  id="incident_type"
                  {...register("incident_type", { required: "Incident Type is required!" })}
                  className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                    errors.incident_type ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Incident Type</option>
                  <option value="theft">Theft</option>
                  <option value="assault">Assault</option>
                  <option value="fraud">Fraud</option>
                  <option value="burglary">Burglary</option>
                  <option value="robbery">Robbery</option>
                  <option value="homicide">Homicide</option>
                  <option value="cybercrime">Cybercrime</option>
                  <option value="other">Other</option>
                </select>
                {errors.incident_type && (
                  <p className="mt-1 text-red-500 text-sm">{errors.incident_type.message}</p>
                )}
              </div>

              {/* Incident Location */}
              <div>
                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">
                  Incident Location
                </label>
                <input
                  type="text"
                  id="location"
                  {...register("location", { required: "Location is required!" })}
                  className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Incident Location"
                />
                {errors.location && (
                  <p className="mt-1 text-red-500 text-sm">{errors.location.message}</p>
                )}
              </div>

              {/* Police Station Name */}
              <div>
                <label htmlFor="policeStationName" className="block mb-2 text-sm font-medium text-gray-900">
                  Police Station Name
                </label>
                <input
                  type="text"
                  id="policeStationName"
                  {...register("policeStationName", { required: "Police Station Name is required!" })}
                  className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                    errors.policeStationName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Police Station Name"
                />
                {errors.policeStationName && (
                  <p className="mt-1 text-red-500 text-sm">{errors.policeStationName.message}</p>
                )}
              </div>

              {/* Report Status */}
              <div>
                <label htmlFor="reportStatus" className="block mb-2 text-sm font-medium text-gray-900">
                  Report Status
                </label>
                <select
                  id="reportStatus"
                  {...register("reportStatus", { required: "Report Status is required!" })}
                  className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                    errors.reportStatus ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="under_investigation">Under Investigation</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                  <option value="closed">Closed</option>
                </select>
                {errors.reportStatus && (
                  <p className="mt-1 text-red-500 text-sm">{errors.reportStatus.message}</p>
                )}
              </div>

              {/* Evidence Files */}
              <div className="md:col-span-2">
                <label htmlFor="evidenceFiles" className="block mb-2 text-sm font-medium text-gray-900">
                  Evidence Files (Multiple files allowed)
                </label>
                <input
                  type="file"
                  id="evidenceFiles"
                  multiple
                  {...register("evidenceFiles", { 
                    required: "At least one evidence file is required!",
                    validate: {
                      fileSize: (files) => {
                        if (!files || files.length === 0) return true;
                        const maxSize = 10 * 1024 * 1024;
                        return Array.from(files).every(file => file.size <= maxSize) || 
                          "Each file should be less than 10MB";
                      },
                      fileTypes: (files) => {
                        if (!files || files.length === 0) return true;
                        const allowedTypes = [
                          'image/jpeg',
                          'image/png',
                          'image/gif',
                          'video/mp4',
                          'video/quicktime',
                          'audio/mpeg',
                          'audio/wav',
                          'application/pdf',
                          'application/msword',
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                          'text/plain'
                        ];
                        return Array.from(files).every(file => 
                          allowedTypes.includes(file.type)
                        ) || "Unsupported file type";
                      }
                    }
                  })}
                  className={`border text-sm rounded-md py-2 px-4 w-full bg-white ${
                    errors.evidenceFiles ? "border-red-500" : "border-gray-300"
                  }`}
                  accept="image/*, video/*, audio/*, .pdf, .doc, .docx, .txt"
                />
                {evidenceFiles && evidenceFiles.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    Selected files: {Array.from(evidenceFiles).map(file => file.name).join(', ')}
                  </div>
                )}
                {errors.evidenceFiles && (
                  <p className="mt-1 text-red-500 text-sm">{errors.evidenceFiles.message}</p>
                )}
              </div>

              {/* Signature */}
              <div className="md:col-span-2">
                <label htmlFor="signatureImage" className="block mb-2 text-sm font-medium text-gray-900">
                  Signature (Image Upload)
                </label>
                <input
                  type="file"
                  id="signatureImage"
                  {...register("signatureImage", { 
                    required: "Signature is required!",
                    validate: {
                      fileFormat: (files) => 
                        files[0]?.type.startsWith('image/') || "Please upload an image file",
                      fileSize: (files) => 
                        files[0]?.size <= 5 * 1024 * 1024 || "File size should be less than 5MB"
                    }
                  })}
                  className={`border text-sm rounded-md py-2 px-4 w-full bg-white ${
                    errors.signatureImage ? "border-red-500" : "border-gray-300"
                  }`}
                  accept="image/*"
                />
                {errors.signatureImage && (
                  <p className="mt-1 text-red-500 text-sm">{errors.signatureImage.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="incident_description" className="block mb-2 text-sm font-medium text-gray-900">
                  Incident Description
                </label>
                <textarea
                  id="incident_description"
                  {...register("incident_description", { 
                    required: "Description is required!",
                    minLength: {
                      value: 20,
                      message: "Description must be at least 20 characters"
                    }
                  })}
                  className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                    errors.incident_description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter detailed description of the incident"
                  rows="4"
                />
                {errors.incident_description && (
                  <p className="mt-1 text-red-500 text-sm">{errors.incident_description.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="bg-custom-teal text-white py-3 px-6 sm:px-8 rounded-full hover:bg-[#1b4664] transition-colors duration-300 shadow-md flex items-center justify-center gap-2 w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <HashLoader color="#ffffff" size={20} />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <FaPlus className="text-lg" />
                    <span>Submit Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReport;