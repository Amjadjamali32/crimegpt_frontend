import { FaBars, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { imagesPath } from "../utils/Images.js"; 

const logo = imagesPath.find((img) => img.id === 16)?.url;

const DashboardHeader = ({ toggleSidebar, isSidebarOpen }) => {
  const [user, setUser] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <header className="flex items-center justify-between p-3 bg-white text-custom-teal shadow-lg fixed w-full z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2 mx-2">
        <img
          src={logo}
          alt="Logo"
          className="w-12 h-12"
        />
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-4 mx-2 font-inter">
        {user && (
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{user?.fullname}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        )}
        
        <div className="h-10 w-10 rounded-full border border-custom-teal shadow-md flex items-center justify-center overflow-hidden">
          {(!user?.profileImage || imageError) ? (
            <FaUserCircle className="h-full w-full text-custom-teal" />
          ) : (
            <img
              src={user.profileImage}
              alt="Avatar"
              loading="lazy"
              onError={handleImageError}
              onLoad={handleImageLoad}
              className={`h-full w-full object-cover ${imageLoaded ? 'block' : 'hidden'}`}
            />
          )}
        </div>

        {/* Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="text-xl focus:outline-none sm:hidden"
        >
          {isSidebarOpen ? (
            <span className="text-4xl">&times;</span>
          ) : (
            <FaBars className="text-2xl" alt="icon"/>
          )}
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;