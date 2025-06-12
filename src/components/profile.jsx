import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../app/features/auth/authSlice.js";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  console.log(user);
  
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {message}</div>;

  return (
    <div className="pt-20">
      <h1 className="4xl font-bold text-center">Profile</h1>
      {user && (
        <div>
          <p>Name: {user?.data?.fullname}</p>
          <p>Email: {user?.data?.email}</p>
          <p>Role: {user?.data?.role}</p> 
        </div>
      )}
    </div>
  );
};

export default Profile;