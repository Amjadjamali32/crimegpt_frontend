import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleAdminReport, updateAdminReport, resetState } from "../../../app/features/reports/reportSlice.js";
import HashLoader from "react-spinners/HashLoader";

const EditReport = () => {
  const { id: reportId } = useParams();
  const dispatch = useDispatch();
  const { singleReport, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.report
  );

  const [signaturePreview, setSignaturePreview] = useState(null);
  const [isSignatureRequired, setIsSignatureRequired] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm();

  // Watch signature image changes
  const signatureImage = watch("signatureImage");

  // Fetch report data when component mounts
  useEffect(() => {
    const fetchReport = async () => {
      try {
        await dispatch(fetchSingleAdminReport(reportId)).unwrap();
      } catch (error) {
        toast.error(error.message || "Failed to load report data");
      }
    };

    fetchReport();
  }, [reportId, dispatch]);

  // Pre-fill form when singleReport data is available
  useEffect(() => {
    if (singleReport?.data) {
      setValue("complainantName", singleReport.data?.complainant_name || "");
      setValue("nicNumber", singleReport.data?.nic || "");
      setValue("crimeType", singleReport.data?.incident_type || "");
      setValue("location", singleReport.data?.location || "");
      setValue("description", singleReport.data?.incident_description || "");
      setValue("reportStatus", singleReport.data?.reportStatus || "pending");
      setValue("policeStationName", singleReport.data?.policeStationName || "");
      
      // Handle signature image
      if (singleReport.data?.signatureImageUrl) {
        setSignaturePreview(singleReport.data.signatureImageUrl);
        setIsSignatureRequired(false);
      } else {
        setIsSignatureRequired(true);
      }
    }
  }, [singleReport, setValue]);

  // Handle signature image preview
  useEffect(() => {
    if (signatureImage?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignaturePreview(reader.result);
      };
      reader.readAsDataURL(signatureImage[0]);
    }
  }, [signatureImage]);

  // Handle success/error messages
  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message);
      dispatch(resetState());
    }
    if (isError && message) {
      toast.error(message);
      dispatch(resetState());
    }
  }, [isSuccess, isError, message, dispatch]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      
      // Append all fields to formData
      Object.keys(data).forEach(key => {
        if (key === "signatureImage" && data[key][0]) {
          formData.append("signatureImage", data[key][0]);
        } else if (key !== "signatureImage") {
          formData.append(key, data[key]);
        }
      });

      await dispatch(updateAdminReport({ reportId, reportData: formData })).unwrap();
      toast.success("Report updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update report");
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <HashLoader color="#173F5C" loading={true} size={60} />
      </div>
    );
  }

  if (!singleReport) {
    return (
      <div className="flex justify-center items-center h-screen font-inter">
        <p className="text-xl text-red-500">Report not found!</p>
      </div>
    );
  }

  return (
    <>
      {/* Main container with responsive padding */}
      <div className="pt-20 pb-8 px-4 lg:pl-64 lg:pr-6 min-h-screen bg-gray-100 font-inter">
        {/* Responsive container */}
        <div className="max-w-4xl mx-auto bg-blue-50 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 sm:p-6">
            {/* Form Header */}
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold text-gray-800">Edit Report</h2>
              {singleReport?.data?.caseNumber && (
                <p className="text-sm text-gray-600 mt-2">
                  Case Number: <span className="font-medium">{singleReport.data.caseNumber}</span>
                </p>
              )}
            </div>

            {/* Form for Editing Reports */}
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
              {/* Police Station Name and Report Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label
                    htmlFor="policeStationName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Police Station Name
                  </label>
                  <input
                    type="text"
                    id="policeStationName"
                    {...register("policeStationName", { required: "Police station name is required!" })}
                    className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                      errors.policeStationName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter Police Station Name"
                  />
                  {errors.policeStationName && (
                    <p className="mt-1 text-red-500 text-sm">{errors.policeStationName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="reportStatus" className="block mb-2 text-sm font-medium text-gray-900">
                    Report Status
                  </label>
                  <select
                    id="reportStatus"
                    {...register("reportStatus", { required: "Report status is required" })}
                    className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                      errors.reportStatus ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="investigation">Investigation</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                    <option value="closed">Closed</option>
                  </select>
                  {errors.reportStatus && (
                    <p className="mt-1 text-red-500 text-sm">{errors.reportStatus.message}</p>
                  )}
                </div>
              </div>

              {/* Complainant and NIC Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label
                    htmlFor="complainantName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Complainant Name
                  </label>
                  <input
                    type="text"
                    id="complainantName"
                    {...register("complainantName", { required: "Complainant Name is required!" })}
                    className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                      errors.complainantName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter Complainant Name"
                  />
                  {errors.complainantName && (
                    <p className="mt-1 text-red-500 text-sm">{errors.complainantName.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="nicNumber"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    NIC Number
                  </label>
                  <input
                    type="text"
                    id="nicNumber"
                    {...register("nicNumber", { required: "NIC Number is required!" })}
                    className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                      errors.nicNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter NIC Number"
                  />
                  {errors.nicNumber && (
                    <p className="mt-1 text-red-500 text-sm">{errors.nicNumber.message}</p>
                  )}
                </div>
              </div>

              {/* Crime Type and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label
                    htmlFor="crimeType"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Crime Type
                  </label>
                  <input
                    type="text"
                    id="crimeType"
                    {...register("crimeType", { required: "Crime Type is required!" })}
                    className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                      errors.crimeType ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter Crime Type"
                  />
                  {errors.crimeType && (
                    <p className="mt-1 text-red-500 text-sm">{errors.crimeType.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    {...register("location", { required: "Location is required!" })}
                    className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                      errors.location ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter Location"
                  />
                  {errors.location && (
                    <p className="mt-1 text-red-500 text-sm">{errors.location.message}</p>
                  )}
                </div>
              </div>
              
              {/* Description (Textarea) */}
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description", { required: "Description is required!" })}
                  className={`border text-sm rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Description"
                  rows="4"
                />
                {errors.description && (
                  <p className="mt-1 text-red-500 text-sm">{errors.description.message}</p>
                )}
              </div>

              {/* Signature Image */}
              <div className="mb-8">
                <label
                  htmlFor="signatureImage"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Signature {!isSignatureRequired && "(Optional - Existing signature will be kept)"}
                </label>
                {signaturePreview && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Current Signature:</p>
                    <img 
                      src={signaturePreview} 
                      alt="Signature Preview" 
                      className="h-20 w-auto border border-gray-300 rounded"
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="signatureImage"
                  accept="image/*"
                  {...register("signatureImage", {
                    validate: {
                      required: (value) => {
                        if (isSignatureRequired && (!value || value.length === 0)) {
                          return "Signature is required";
                        }
                        return true;
                      },
                      fileFormat: (value) => {
                        if (value && value[0]) {
                          const acceptedFormats = ["image/jpeg", "image/png", "image/gif"];
                          if (!acceptedFormats.includes(value[0].type)) {
                            return "Only JPEG, PNG, or GIF images are allowed";
                          }
                        }
                        return true;
                      },
                    },
                  })}
                  className={`border text-sm rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-custom-teal focus:border-transparent ${
                    errors.signatureImage ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.signatureImage && (
                  <p className="mt-1 text-red-500 text-sm">{errors.signatureImage.message}</p>
                )}
              </div>

              {/* Update Report Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-custom-teal text-white py-3 px-6 sm:px-8 rounded-full hover:bg-[#1b4664] transition-colors duration-300 shadow-md flex items-center gap-2 text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <HashLoader color="#ffffff" size={20} />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      Update Report
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                        <path d="M16 16h5v5" />
                      </svg>
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

export default EditReport;