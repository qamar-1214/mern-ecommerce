import React, { useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common";
import { toast } from "react-toastify";
import axios from "axios";
import { setUserDetails } from "../store/userSlice";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  console.log("user header", user);

  const handleLogout = async () => {
    try {
      const response = await axios({
        url: summaryApi.logout_user.url, // URL for the logout endpoint
        method: summaryApi.logout_user.method, // Logout method (should be 'POST' or 'GET')
        withCredentials: true, // Include cookies (like the token)
      });

      // Check if the response indicates success
      if (response.data.success) {
        toast.success(response.data.message || "Logged out successfully!");
        dispatch(setUserDetails(null));
        // Optionally redirect to a login page or home page after logout
        // window.location.href = "/login";
      } else {
        toast.error(response.data.message || "Error logging out");
      }
    } catch (error) {
      // Handle error scenarios
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        toast.error(error.message || "Failed to log out");
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        // No response was received from the server
        toast.error("No response from server. Please try again.");
        console.error("No response received:", error.request);
      } else {
        // Some other error occurred
        toast.error("An unexpected error occurred.");
        console.error("Error:", error.message);
      }
    }
  };
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="container mx-auto h-full w-[95%] flex items-center justify-between px-4">
        <div>
          <Link to="/">
            <Logo h={60} w={100} />
          </Link>
        </div>
        <div className="hidden lg:flex justify-between items-center sm:w-full h-8 max-w-sm   focus-within:shadow-md  border  rounded-full pl-2">
          <input
            className="w-full outline-none   bg-transparent "
            type="text"
            placeholder="search procuct here...."
          />
          <div className="flex items-center justify-center sm:min-w-[50px] h-full  min-w-8 text-white font-bold text-xl bg-red-600 rounded-r-full cursor-pointer">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            <div
              className="text-3xl cursor-pointer"
              onClick={() => setMenuDisplay((prev) => !prev)}
            >
              {user?.data?.profile_pic ? (
                <img
                  src={user?.data?.profile_pic}
                  className="w-10 h-10 rounded-full"
                  alt={user.data.name}
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
            {menuDisplay && (
              <div className="absolute bottom-0 top-11 bg-white p-2 h-fit shadow-lg rounded">
                <nav>
                  <Link
                    to={"admin-panel"}
                    className="whitespace-nowrap hover:bg-gray-100 p-2"
                  >
                    Admin Panel
                  </Link>
                </nav>
              </div>
            )}
          </div>

          <div className="text-2xl cursor-pointer relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600  flex justify-center items-center text-sm w-5 h-5 p-1 text-white rounded-full absolute -top-2 -right-3">
              <p>0</p>
            </div>
          </div>
          <div>
            {user?.data?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 rounded-full hover:bg-red-700 transition-all duration-300 text-white"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 bg-red-600 rounded-full hover:bg-red-700 transition-all duration-300 text-white"
              >
                SignIn
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
