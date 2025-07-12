import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { imagesPath } from "../utils/Images.js"; 
import { loginUser, resetState } from "../app/features/auth/authSlice.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { setUserRole } from "../app/features/auth/authSlice.js";
import { requestFCMToken } from "../config/firebase.js"; 
import { useState } from "react";

const logo = imagesPath.find((img) => img.id === 16)?.url;

const Login = () => {
  const [fcmToken, setFcmToken] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, isError, message, user, role } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!fcmToken) {
      const token = await requestFCMToken();
      setFcmToken(token);
      console.log("FCM Token: ", token);
    }
  
    const loginData = {
      ...data,
      fcmToken: fcmToken || (await requestFCMToken()),
    };
  
    dispatch(loginUser(loginData));
  };
  
  useEffect(() => {
    if (isSuccess && user) {
      toast.dismiss();
      dispatch(setUserRole(role));
      toast.success("You're now logged In!");
  
      // Redirect after a small delay
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin-dashboard", { replace: true });
        } else if (role === "user") {
          navigate("/dashboard", { replace: true });
        }
        dispatch(resetState());
      }, 500);
    } else if (isError) {
      toast.error(message || "Login failed. Please check your credentials.");
      setTimeout(() => {
        dispatch(resetState());
      }, 3000); 
    }
  }, [isSuccess, isError, user, message, navigate, dispatch, role]);

  return (
    <>
      <div className="pt-20 md:pt-20 lg:pt-24 xl:pt-28">
        <div className="flex flex-wrap items-center justify-center bg-gray-100 w-11/12 mx-auto mb-4 rounded-md p-6 shadow-xl border sm:w-6/12 md:p-2 md:w-5/12 lg:justify-center lg:w-4/12 border-[#c2c8d0]">
          <div className="md:w-9/12 lg:w-10/12 w-full">
            <div className="text-center mb-4 sm:mb-2">
              <img
                src={logo}
                alt="Logo"
                className="mx-auto w-2/6 sm:w-1/6 md:w-2/6 lg:w-[70px]"
              />
              <h2 className="text-3xl font-extrabold text-primary text-custom-teal font-inter sm:text-2xl md:text-3xl lg:text-2xl lg:mb-2">
                Welcome back
              </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <div className="font-inter">
                <label
                  htmlFor="email-address-icon"
                  className="block mb-2 text-xs text-custom-teal"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 fill-custom-teal"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email-address-icon"
                    className="rounded-md focus:outline-none border border-[#c2c8d0] block w-full ps-10 shadow-lg text-xs py-4 sm:py-3 lg:text-sm focus:border-custom-teal"
                    placeholder="Email address"
                    autoComplete="email"
                    {...register("email", { required: "Email is required!" })}
                  />
                </div>
                {/* Error Message */}
                {errors.email && (
                  <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="font-inter my-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-xs text-custom-teal"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-4 h-4 fill-custom-teal"
                    >
                      <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="text-xs rounded-md focus:outline-none border border-[#c2c8d0] block w-full ps-10 py-4 shadow-lg sm:py-3 lg:text-sm focus:border-custom-teal"
                    placeholder="Password"
                    autoComplete="current-password"
                    {...register("password", { required: "Password is required!" })}
                  />
                </div>
                {/* Error Message */}
                {errors.password && (
                  <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div>
                <div className="my-6 flex items-center justify-between sm:my-2">
                  <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                    <input
                      className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border border-solid border-custom-teal outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-custom-teal checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:checked:border-custom-teal dark:checked:bg-custom-teal font-inter sm:mt-1"
                      type="checkbox"
                      id="remember-me"
                      {...register("rememberMe")}
                    />
                    <label
                      className="inline-block ps-[0.15rem] hover:cursor-pointer text-sm sm:text-xs font-inter lg:text-sm"
                      htmlFor="remember-me"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="font-inter text-sm text-custom-teal sm:text-xs lg:text-sm"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center lg:text-left">
                <button
                disabled={isLoading}
                  type="submit"
                  className="inline-block w-full rounded bg-custom-teal py-4 text-xs font-inter uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong sm:py-3 sm:my-2 shadow-lg hover:opacity-90"
                >
                  Login
                </button>

                <div className="my-4 flex items-center before:content-[''] before:block before:flex-1 before:h-[1px] before:bg-custom-teal after:content-[''] after:block after:flex-1 after:h-[1px] after:bg-custom-teal sm:my-2">
                  <p className="text-center text-sm text-custom-teal">OR</p>
                </div>

                <div className="flex justify-center gap-4">
                   <p className="font-inter text-sm">Don&apos;t have an account? <Link to="/register"><span className="text-custom-teal hover:cursor-pointer">Sign up</span></Link></p>
                </div>
              </div>
            </form>
          </div>
        </div>

      {/* Loader: Centered on the page */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
          <HashLoader size={50} color="#173F5C" loading={isLoading} />
        </div>
      )}
      </div>
    </>
  );
};

export default Login;
