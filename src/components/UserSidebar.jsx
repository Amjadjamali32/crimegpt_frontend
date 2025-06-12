import { NavLink } from "react-router-dom";  
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { markAllAsRead, selectUnreadNotificationsCount, fetchUserNotifications } from '../app/features/notifications/notificationSlice.js'; 
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const UserSidebar = () => {
  const dispatch = useDispatch();
  const unreadNotificationsCount = useSelector(selectUnreadNotificationsCount);
  const user = useSelector(state => state.auth); 
  
  useEffect(() => {
    const userId = user._id;
    dispatch(fetchUserNotifications(userId));
  }, [dispatch]);
  
  const handleNotificationClick = () => {
    dispatch(markAllAsRead()); 
  };

  return (
    <div className="h-full bg-custom-teal text-white font-inter shadow-lg z-40">
      <div className="mt-[72px] p-4 text-left bg-blue-950 shadow-sm">
        <h2 className="text-md font-normal ms-4 font-inter">User Dashboard</h2>
      </div>
      <ul className="font-light text-sm">
        <li className="hover:bg-blue-900">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center p-3 space-x-2 ${
                isActive ? "bg-blue-900" : ""
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={20}
              className="fill-white mx-4"
            >
              <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3L280 88c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 204.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
            </svg>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="hover:bg-blue-900">
          <NavLink
            to="/report"
            className={({ isActive }) =>
              `flex items-center p-3 space-x-2 ${
                isActive ? "bg-blue-900" : ""
              }`
            }
          >
            <NoteAddIcon className="mx-3.5" />
            <span>Report Crime</span>
          </NavLink>
        </li>
        <li className="hover:bg-blue-900">
          <NavLink
            to="/my-reports"
            className={({ isActive }) =>
              `flex items-center p-3 space-x-2 ${
                isActive ? "bg-blue-900" : ""
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={20}
              className="mx-4 fill-white"
            >
              <path d="M0 96C0 60.7 28.7 32 64 32l132.1 0c19.1 0 37.4 7.6 50.9 21.1L289.9 96 448 96c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-256c0-8.8-7.2-16-16-16l-161.4 0c-10.6 0-20.8-4.2-28.3-11.7L213.1 87c-4.5-4.5-10.6-7-17-7L64 80z" />
            </svg>
            <span>My Reports</span>
          </NavLink>
        </li>
        <li className="hover:bg-blue-900">
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `flex items-center p-3 space-x-2 ${
                isActive ? 'bg-blue-900' : ''
              }`
            }
            onClick={handleNotificationClick} 
          >
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width={20}
                className="fill-white mx-4"
              >
                <path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
              </svg>
              {/* Red circle with notification count */}
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </div>
            <span>Notifications</span>
          </NavLink>
        </li>
        <li className="hover:bg-blue-900">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `flex items-center p-3 space-x-2 ${
                isActive ? "bg-blue-900" : ""
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={20}
              className="mx-4 fill-white"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <span>Search</span>
          </NavLink>
        </li>
        <li className="hover:bg-blue-900">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center p-3 space-x-2 ${
                isActive ? "bg-blue-900" : ""
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={20}
              className="fill-white mx-4"
            >
              <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
            </svg>
            <span>Settings</span>
          </NavLink>
        </li>
        <li className="hover:bg-blue-900">
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              `flex items-center p-3 space-x-2 ${
                isActive ? "bg-blue-900" : ""
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={20}
              className="mx-4 fill-white"
            >
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
            </svg>
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;