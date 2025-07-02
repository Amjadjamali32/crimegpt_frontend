import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "react-toastify";
import {
  FaEraser,
  FaMicrophone,
  FaFileAlt,
  FaCamera,
  FaVideo,
  FaExclamationTriangle,
  FaPenAlt,
  FaInfoCircle,
  FaRobot,
  FaTrashAlt,
  FaSpinner,
  FaShieldAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { submitCrimeReport } from "../../../app/features/reports/reportSlice.js";
import { HashLoader } from "react-spinners";

const CrimeReports = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.report);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const sigCanvas = useRef(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const documentRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(
          new Error("Location services are not available in your browser!")
        );
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates({ latitude, longitude });
            resolve({ latitude, longitude });
          },
          (error) => {
            console.log("Error getting location:", error);
            reject(new Error("Unable to retrieve your location!"));
          }
        );
      }
    });
  };

  const onSubmit = async (data) => {
    try {
      const { latitude, longitude } = await getLocation();

      // Check if signature exists
      if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
        setError("signature", {
          type: "manual",
          message: "Please provide a signature before submitting Report!",
        });
        return;
      }

      if (!data.prompt.trim()) {
        setError("prompt", {
          type: "manual",
          message: "The report prompt is required!",
        });
        return;
      }

      // Get the signature as data URL
      const signatureData = sigCanvas.current.toDataURL("image/png");
      const signatureFile = base64ToFile(signatureData, "signature.png");

      const formData = new FormData();
      formData.append("signatureImage", signatureFile);
      formData.append("prompt", data.prompt);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      if (imageRef.current?.files.length > 0) {
        formData.append("evidenceFiles", imageRef.current.files[0]);
      }
      if (videoRef.current?.files.length > 0) {
        formData.append("evidenceFiles", videoRef.current.files[0]);
      }
      if (documentRef.current?.files.length > 0) {
        formData.append("evidenceFiles", documentRef.current.files[0]);
      }

      await dispatch(submitCrimeReport(formData)).unwrap();
      toast.success("Report submitted successfully");
      reset();
      sigCanvas.current.clear();
      if (imageRef.current) imageRef.current.value = "";
      if (videoRef.current) videoRef.current.value = "";
      if (documentRef.current) documentRef.current.value = "";
      setValue("prompt", "");
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report! Please try again");
    }
  };

  const clearReport = () => {
    sigCanvas.current?.clear();
    if (imageRef.current) imageRef.current.value = "";
    if (videoRef.current) videoRef.current.value = "";
    if (documentRef.current) documentRef.current.value = "";
    setValue("prompt", "");
    toast.success("Your report has been cleared successfully");
  };

  const startVoiceToText = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.error("Your browser does not support voice recognition!");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.start();
    setIsListening(true);

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setValue("prompt", transcript);
    };

    recognition.onerror = (event) => {
      toast.error("Error occurred in recognition: " + event.error);
      setIsListening(false);
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <HashLoader color="#173F5C" size={60} />
      </div>
    );
  }

  return (
    <div className="pt-24 pl-0 md:pl-64">
      {/* Adjust pl-64 to match your sidebar width */}
      <div className="max-w-4xl mx-4 md:mx-8 lg:mx-auto font-inter bg-custom-teal rounded-md">
        {" "}
        {/* Responsive horizontal margins */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-custom-teal shadow-md rounded-lg px-4 py-6 sm:p-8 space-y-6"
        >
          {/* Form Header */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8">
            Report Suspicious Activity Now
          </h1>

          {/* Grid Container */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Image Evidence */}
            {/* Image Evidence */}
            <div className="sm:col-span-1">
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-1">
                <FaCamera className="text-teal-300" />
                Attach Crime Scene Photos (JPEG, PNG)
              </label>
              <input
                ref={imageRef}
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 bg-white rounded-md
                file:mr-4 file:py-2.5 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-white file:text-teal-600
                hover:file:bg-gray-100 file:shadow-sm
                file:ring-1 file:ring-gray-300"
              />
            </div>

            {/* Video/Audio Evidence */}
            <div className="sm:col-span-1">
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-1">
                <FaVideo className="text-teal-300" />
                Attach Surveillance Footage or Recordings
              </label>
              <input
                ref={videoRef}
                type="file"
                accept="video/*,audio/*"
                className="block w-full text-sm text-gray-500 bg-white rounded-md
                file:mr-4 file:py-2.5 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-white file:text-teal-600
                hover:file:bg-gray-100 file:shadow-sm
                file:ring-1 file:ring-gray-300"
              />
            </div>

            {/* Document Evidence - Full Width */}
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-1">
                <FaFileAlt className="text-teal-300" />
                Supporting Document Evidences
              </label>
              <input
                ref={documentRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="block w-full text-sm text-gray-500 bg-white rounded-md
                file:mr-4 file:py-2.5 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-white file:text-teal-600
                hover:file:bg-gray-100 file:shadow-sm
                file:ring-1 file:ring-gray-300"
              />
            </div>

            {/* Signature - Full Width */}
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                <FaPenAlt className="text-teal-300" />
                Sign to Verify This Report
              </label>

              <div className="border border-gray-300 bg-white rounded-md shadow-sm p-4">
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor="red"
                  canvasProps={{
                    width: 500,
                    height: 100,
                    className: "sigCanvas w-full",
                    style: {
                      maxWidth: "100%",
                      border: "1px dashed #d1d5db", // Added dashed border for better visibility
                      backgroundColor: "#f9fafb", // Light gray background
                    },
                  }}
                />

                <div className="flex flex-wrap justify-between mt-3 gap-2">
                  <button
                    type="button"
                    onClick={() => sigCanvas.current?.clear()}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    <FaEraser className="text-gray-600" />
                    Clear Signature
                  </button>

                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FaInfoCircle />
                    Sign within the canvas area
                  </p>
                </div>

                {errors.signature && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <FaExclamationTriangle />
                    {errors.signature.message}
                  </p>
                )}
              </div>
            </div>

            {/* Report Prompt - Full Width */}
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-white">
                  Report Details
                </label>
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  <FaRobot className="text-blue-600" />
                  AI-assisted report
                </span>
              </div>

              <div className="relative">
                <textarea
                  {...register("prompt", {
                    required: "Please provide report details",
                  })}
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Example: 'On July 15 at 3 PM, I witnessed two suspects breaking into a blue sedan at the Walmart parking lot...'"
                />

                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={startVoiceToText}
                  className="absolute bottom-5 right-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Voice input"
                  title="Start voice recording"
                >
                  <FaMicrophone
                    className={`w-5 h-5 ${
                      isListening
                        ? "text-teal-600 animate-pulse"
                        : "text-gray-500"
                    }`}
                  />
                </button>
              </div>

              {/* AI Notice and Error Message */}
              <div className="mt-1 space-y-1">
                <p className="flex items-start gap-1 text-xs text-gray-400">
                  <FaInfoCircle className="flex-shrink-0 mt-0.5" />
                  <span>
                    This report uses AI assistance. Please verify all generated
                    information for accuracy.
                  </span>
                </p>

                {errors.prompt && (
                  <p className="flex items-center gap-1 text-sm text-red-600">
                    <FaExclamationTriangle />
                    {errors.prompt.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-around gap-4 pt-4">
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-full shadow-lg focus:outline-none focus:ring-teal-500 disabled:opacity-70 flex items-center justify-center gap-2 transition-transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <FaShieldAlt className="text-white" />
                  Get Emergency Help
                </>
              )}
            </button>

            {/* Clear Button */}
            <button
              type="button"
              onClick={clearReport}
              className="w-full sm:w-auto px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full shadow-lg focus:outline-none flex items-center justify-center gap-2 transition-transform hover:scale-105"
            >
              <FaTrashAlt />
              Clear All Evidence
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrimeReports;
