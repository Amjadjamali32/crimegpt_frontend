import AdminSidebar from './AdminSidebar';
import UserSidebar from './UserSidebar';

const Sidebar = ({ isOpen, closeSidebar, role }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0 w-64 bg-gray-800 text-white shadow-lg transition-transform duration-300 z-40`}
    >
      {role === "admin" ? <AdminSidebar /> : <UserSidebar />}
    </div>
  );
};

export default Sidebar;
