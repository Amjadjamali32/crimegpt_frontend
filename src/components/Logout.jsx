import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../app/features/auth/authSlice.js";
import { Navigate, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { WarningAmber } from "@mui/icons-material";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";

const Logout = () => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        dispatch(logoutUser());
        localStorage.removeItem("user");
        toast.success("Logout successful! You are signed out.");
  
        setTimeout(() => {
          setConfirmLogout(true);
        }, 1000); // Give toast a second to display
  
      }, 3000);
    } catch (error) {
      setLoading(false);
      toast.error("Logout failed");
      console.error("Error during logout:", error);
    }
  };  

  const handleCancel = () => {
    setOpen(false);
    navigate(-1); // Navigates back to the previous page
  };

  if (confirmLogout) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/30">
          <HashLoader color="#173F5C" size={60} />
        </div>
      ) : (
        <Dialog open={open} onClose={handleCancel} className="relative z-50 font-inter">
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"></div>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="relative transform overflow-hidden rounded-md bg-white p-6 text-center shadow-xl w-full max-w-md">
              <div className="flex flex-col items-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full">
                  <WarningAmber className="text-red-600" fontSize="large" />
                </div>
                <DialogTitle className="mt-2 text-lg font-bold text-gray-900">
                  Confirm Logout
                </DialogTitle>
                <p className="mt-1 text-sm text-gray-500">
                  Are you sure you want to log out?
                </p>
              </div>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  className="px-8 py-2 text-sm bg-custom-teal text-white hover:opacity-85 transition-all rounded-full shadow-lg"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
                <button
                  className="px-8 py-2 text-sm bg-gray-300 hover:bg-gray-400 transition-all rounded-full shadow-lg"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Logout;