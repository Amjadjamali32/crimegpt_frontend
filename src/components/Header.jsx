import { useState } from "react";
import { imagesPath } from "../utils/Images.js"; 
import { Link } from "react-router-dom";

const logo = imagesPath.find((img) => img.id === 16)?.url;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-black shadow-xl fixed z-50 w-full">
      <div className="container mx-auto md:mx-0 py-1 px-2 sm:px-6 lg:px-8 max-w-full">
        {/* Grid layout for medium and large screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center">
          {/* Logo */}
          <div className="text-xl font-bold flex justify-between md:justify-start items-center md:ps-0">
            <Link to="/">
              <img
                src={logo}
                className="w-2/12 sm:w-1/12 md:w-3/12 lg:w-2/12 xl:w-2/12"
                alt="Logo"
              />
            </Link>
            {/* Hamburger Menu - Mobile */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="#173F5C"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Links - Desktop */}
          <div className="hidden md:flex col-span-2 justify-end space-x-6 font-inter text-sm items-center md:col-span-2">
            <Link to="/" className="hover:text-blue-300 py-2">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-300 py-2">
              About 
            </Link>
            <Link to="/guide" className="hover:text-blue-300 py-2 lg:mx-8">
              Guide
            </Link>
            <Link to="/contact" className="hover:text-blue-300 py-2 lg:mx-4">
              Contact Us
            </Link>
            <Link to="/faqs" className="hover:text-blue-300 py-2 lg:mx-4">
              FAQs
            </Link>
            <div className="flex space-x-4">
            <Link
                to="/login"
                className="bg-custom-teal rounded-full px-12 py-2 text-white font-inter shadow-lg border border-black font-medium hover:bg-blue-950"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white rounded-full px-10 py-2 font-inter shadow-lg border border-black font-medium hover:bg-custom-teal hover:text-white"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-custom-teal text-white font-light text-sm">
            <div className="flex flex-col space-y-3 px-4 py-3">
              <Link to="/" className="hover:text-blue-300">
                Home
              </Link>
              <Link to="/about" className="hover:text-blue-300">
                About Us
              </Link>
              <Link to="/guide" className="hover:text-blue-300">
                How It Works
              </Link>
              <Link to="/contact" className="hover:text-blue-300">
                Contact Us
              </Link>
              <Link to="/faqs" className="hover:text-blue-300">
                FAQs
              </Link>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/login"
                  className="hover:text-blue-300 bg-white text-custom-teal py-1 rounded-full px-2 w-full text-center shadow-md border border-black font-inter"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hover:text-blue-300 bg-custom-teal text-white py-1 rounded-full px-2 w-full text-center shadow-md border border-black font-inter"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
