import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from "react-router-dom";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Verifying your email...");
    const [isSuccess, setIsSuccess] = useState(null);
    const [hasVerified, setHasVerified] = useState(false);
    const isVerifiedRef = useRef(false);  

    useEffect(() => {
        const verifyEmail = async () => {
            console.log("Verifying email for token:", token);

            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify/${token}`);
                console.log("API Response:", res.data);

                if (res.data.success) {
                    setMessage(res.message); 
                    setIsSuccess(true);
                } else {
                    setMessage(res.message);
                    setIsSuccess(false);
                }
            } catch (err) {
                console.error("Verification Error:", err.response ? err.response.data : err);
                setMessage("Error verifying email! Please try again.");
                setIsSuccess(false);
            }

            setHasVerified(true);
        };

        if (token && !isVerifiedRef.current) {
            isVerifiedRef.current = true; // Mark the email as verified
            verifyEmail();
        }
    }, [token]);

    useEffect(() => {
        if (isSuccess) {
            // Redirect to login page after 5 seconds when email is successfully verified
            const timer = setTimeout(() => {
                navigate("/login");
            }, 5000); // 5000ms = 5 seconds

            // Clean up timer if component unmounts or isSuccess changes
            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4 font-inter">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-custom-teal text-center max-w-md w-full">
                {isSuccess !== null && (
                    <div className="flex flex-col items-center">
                        <CheckCircleIcon sx={{ fontSize: 50 }} className="text-green-500 mb-3" />
                        <h1 className="text-2xl md:text-3xl lg:text-3xl xl:text-3xl font-extrabold mt-2 font-poppins">
                            {isSuccess ? "Email Verified!" : "Verification Failed!"}
                        </h1>
                        <p className="text-gray-600 mt-2 text-sm md:text-base">
                            {message}
                        </p>
                        {isSuccess && (
                            <p className="text-gray-600 mt-4 text-sm md:text-base">
                              Redirecting to login page in 5 seconds...
                            </p>
                        )}
                        <Link 
                            to={isSuccess ? "/login" : "/"} 
                            className="mt-4 px-8 py-2 bg-custom-teal text-white rounded-md text-sm font-normal hover:opacity-85 transition duration-300"
                            onClick={() => isSuccess && navigate("/login")}
                        >
                            {isSuccess ? "Go to Login" : "Try Again"}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
