import DashboardHeader from "./DashboardHeader";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Layout = ({ children, toggleSidebar, isSidebarOpen, closeSidebar }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const location = useLocation();

  // Optional: don't show layout on logout or loading pages
  const noLayoutRoutes = ["/logout"];
  if (noLayoutRoutes.includes(location.pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <DashboardHeader
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
          <Sidebar
            isOpen={isSidebarOpen}
            closeSidebar={closeSidebar}
            role={role}
          />
        </>
      ) : (
        <Header />
      )}

      <main className="min-h-screen">{children}</main>

      {!isLoggedIn && <Footer />}
    </>
  );
};

export default Layout;
