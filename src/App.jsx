// Remaining tasks:
// 1. map in admin panel correction
// 2. editing user edits but its ui does not hold new updates

import DashboardHeader from "./components/DashboardHeader";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserRole } from "./app/features/auth/authSlice";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import Works from "./pages/Works";
import Login from "./pages/Login";
import SignUp from "./pages/Registration";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";
import UserDashboard from "./pages/user/UserDashboard";
import VerifyEmail from "./pages/VerifyEmail";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import Setting from "./pages/admin/Setting/Setting";
import { HashLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import Logout from "./components/Logout";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoutes";
import Profile from "./components/profile";
import CrimeReports from "../src/pages/user/CrimeReport/CrimeReports";
import MyReportsView from "./pages/user/MyReports/MyReportsView";
import SingleReportsView from "./pages/user/MyReports/SingleReportView";
import Notifications from "./pages/user/Notifications/Notifications";
import SearchReportStatus from "./pages/user/Search/Search";
import NotificationDetails from "./pages/user/Notifications/NotificationDetails";
import ManageUsers from "./pages/admin/users/ManageUsers";
import EditUserprofile from "./pages/admin/users/EditUserprofile";
import Feedback from "./pages/admin/feedbacks/Feedback";
import FeedBackDetails from "./pages/admin/feedbacks/FeedbackDetails";
import ManageReports from "./pages/admin/reports/ManageReports"
import SingleAdminReportView from "./pages/admin/reports/SingleAdminReportView"
import EditReports from "./pages/admin/reports/EditReports"
import AddReports from "./pages/admin/reports/AddReports";
import Evidence from "./pages/admin/evidence/Evidence";
import EvidenceDetails from "./pages/admin/evidence/EvidenceDetails";
import ManageNotifications from "./pages/admin/notifications/ManageNotifications"
import AdminNotifications from "./pages/admin/notifications/AdminNotifications";
import Layout from "./components/Layout";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  // Load authentication state on app start
  useEffect(() => {
    const loadUserData = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedRole = localStorage.getItem("role");

      if (storedUser && storedRole) {
        dispatch(setUserRole(storedRole));
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };

    loadUserData();
  }, [dispatch]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Show a loader while authentication state is being loaded
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <HashLoader color="#173F5C" size={60} />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
      />

      <Layout
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
      >
        <Routes>
          {/* Public routes */}
          {!isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/guide" element={<Works />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/verify-email/:token" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            </>
          ) : (
            <Route
              path="*"
              element={
                role === "admin" ? (
                  <Navigate to="/admin-dashboard" replace />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />
          )}

          {/* Admin protected routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<ManageUsers />} />
            <Route path="/edit-user/:id" element={<EditUserprofile />} />
            <Route path="/feedbacks" element={<Feedback />} />
            <Route path="/feedbacks/:id" element={<FeedBackDetails />} />
            <Route path="/reports" element={<ManageReports />} />
            <Route path="/reports/:id" element={<SingleAdminReportView />} />
            <Route path="/EditReports/:id" element={<EditReports />} />
            <Route path="/addReport" element={<AddReports />} />
            <Route path="/evidences" element={<Evidence />} />
            <Route path="/evidences/:id" element={<EvidenceDetails />} />
            <Route
              path="/manage-notifications"
              element={<ManageNotifications />}
            />
            <Route
              path="/notification-details/:id"
              element={<AdminNotifications />}
            />
          </Route>

          {/* User protected routes */}
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/report" element={<CrimeReports />} />
            <Route path="/my-reports" element={<MyReportsView />} />
            <Route
              path="/user/reports/:reportId"
              element={<SingleReportsView />}
            />
            <Route path="/search" element={<SearchReportStatus />} />
          </Route>

          {/* Shared protected routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin", "user"]} />}>
            <Route path="/settings" element={<Setting />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/notifications/:id" element={<NotificationDetails />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
