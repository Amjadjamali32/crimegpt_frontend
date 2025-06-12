import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "react-toastify";
import { FaPaperPlane, FaEraser, FaMicrophone } from "react-icons/fa";
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
    getValues,
    formState: { errors },
  } = useForm();

  const sigCanvas = useRef(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const documentRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

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

  // Function to get user's location
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
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
      // Get user's location
      const { latitude, longitude } = await getLocation();

      // Validate signature
      if (sigCanvas.current.isEmpty()) {
        setError("signature", {
          type: "manual",
          message: "Please provide a signature before submitting!",
        });
        return;
      }

      // Validate prompt
      if (!data.prompt.trim()) {
        setError("prompt", {
          type: "manual",
          message: "The report prompt is required!",
        });
        return;
      }

      // Convert signature to file
      const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
      const signatureFile = base64ToFile(signatureData, "signature.png");

      // Prepare FormData
      const formData = new FormData();
      formData.append("signatureImage", signatureFile);
      formData.append("prompt", data.prompt);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      // Append all evidence files to the 'evidenceFiles' field
      if (imageRef.current.files.length > 0) {
        formData.append("evidenceFiles", imageRef.current.files[0]);
      }
      if (videoRef.current.files.length > 0) {
        formData.append("evidenceFiles", videoRef.current.files[0]);
      }
      if (documentRef.current.files.length > 0) {
        formData.append("evidenceFiles", documentRef.current.files[0]);
      }

      // // Log FormData contents
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      // Submit the form data
      await dispatch(submitCrimeReport(formData)).unwrap();
      toast.success("Report submitted successfully");

      // Clear form
      sigCanvas.current.clear();
      imageRef.current.value = "";
      videoRef.current.value = "";
      documentRef.current.value = "";
      setValue("prompt", "");
    } catch (error) {
      console.log("Error submitting report:", error);
      toast.error(`Failed to submit report! Please try again`);
    }
  };

  const clearReport = () => {
    sigCanvas.current.clear();
    imageRef.current.value = "";
    videoRef.current.value = "";
    documentRef.current.value = "";
    setValue("prompt", "");
    toast.success("Report has been cleared successfully");
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

    // Start listening
    recognition.start();
    setIsListening(true);

    // When speech recognition ends
    recognition.onend = () => {
      setIsListening(false);
    };

    // When a result is received
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Transcript:", transcript); 
      setValue("prompt", transcript); 
    };

    // Handle errors
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error); 
      toast.error("Error occurred in recognition: " + event.error);
      setIsListening(false);
    };
  };

  // Debugging: Log the prompt value whenever it changes
  useEffect(() => {
    console.log("Prompt value:", getValues("prompt"));
  }, [getValues("prompt")]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <HashLoader color="#173F5C" size={60} />
      </div>
    );
  }

  return (
    <div className="pt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid mb-20 grid-cols-1 shadow-md shadow-gray-600 gap-6 mx-2 bg-custom-teal px-6 sm:px-10 sm:ms-[40%] sm:w-[55%] md:ms-[34%] lg:ms-[30%] md:w-[60%] lg:w-[60%] xl:w-[50%] py-8 rounded lg:grid-cols-2 font-inter"
      >
        <h1 className="col-span-full text-2xl text-gray-50 text-center font-bold sm:text-3xl pb-3">
          Report A Crime
        </h1>

        <div>
          <label className="block mb-2 text-sm font-normal text-white">Image Evidence</label>
          <input
            ref={imageRef}
            type="file"
            className="block w-full text-sm text-gray-900 border rounded-md bg-white py-2 px-2"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-normal text-white">Video Or Audio Evidence</label>
          <input
            ref={videoRef}
            type="file"
            className="block w-full text-sm text-gray-900 border rounded-md bg-white py-2 px-2"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="block mb-2 text-sm font-normal text-white">Document Evidence</label>
          <input
            ref={documentRef}
            type="file"
            className="block w-full text-sm text-gray-900 border rounded-md bg-white py-2 px-2"
          />
        </div>

        <div className="xl:col-span-2 lg:col-span-2">
          <h2 className="block mb-2 text-sm font-normal text-white">Signature</h2>
          <div className="border border-gray-300 bg-white rounded-md shadow p-4">
            <SignatureCanvas
              ref={sigCanvas}
              penColor="red"
              canvasProps={{ width: 500, height: 100, className: "bg-blue w-full" }}
            />
            {errors.signature && (
              <p className="text-red-500 text-xs mt-1">{errors.signature.message}</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <label className="block mb-2 text-sm font-normal text-white">Report Prompt</label>
          <div className="relative">
            <textarea
              {...register("prompt", { required: "Prompt is required" })}
              className="w-full h-32 p-3 rounded-lg text-sm pr-12"
              placeholder="Type a report prompt..."
            />
            {errors.prompt && <p className="text-red-500 text-xs mt-1">{errors.prompt.message}</p>}
            <button
              type="button"
              onClick={startVoiceToText}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaMicrophone className={`w-6 h-6 ${isListening ? "text-teal-400" : "text-custom-teal"}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:col-span-2 pb-2">
          <button
            type="submit"
            className="px-6 py-3 w-full text-white bg-teal-400 rounded-md hover:opacity-85 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            <FaPaperPlane /> {isLoading ? "Submitting..." : "Submit Report"}
          </button>
          <button
            type="button"
            onClick={clearReport}
            className="px-6 py-3 w-full text-white bg-red-500 rounded-md hover:opacity-85 flex items-center justify-center gap-2"
          >
            <FaEraser /> Clear Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrimeReports;