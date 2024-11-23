import React, { useContext, useState } from "react";
import signInImg from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { imageTobase64 } from "../helpers/imageTobase64";
import axios from "axios";
import summaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    profile_pic: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  //handleInput values
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((data) => {
      return {
        ...data,
        [name]: value,
      };
    });
  };
  //file upload handle function
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    console.log(imagePic);
    setData((prev) => {
      return {
        ...prev,
        profile_pic: imagePic,
      };
    });
  };
  //handleSubmit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const response = await axios.post(summaryApi.signIn.url, data, {
        withCredentials: true,
      });
      if (response && response.data) {
        console.log("User logged in.", response.data);
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/");
          fetchUserDetails();
          console.log(fetchUserDetails());
        } else {
          toast.error(response.data.message);
        }
      } else {
        setError(true);
        toast.error("No response data recieved.");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);

      // Log the full error object to understand its structure
      console.log("Full error object:", error);

      if (error.response) {
        // Log error.response and error.response.data to inspect what is being returned
        console.log("error.response:", error.response);
        console.log("error.response.data:", error.response.data);

        if (error.response.data && error.response.data.message) {
          console.log("Error while signing in:", error.response.data.message);
          toast.error(error.response.data.message);
        } else {
          // If no specific message, show the status or fallback error
          toast.error(error.response.statusText || "An error occurred");
        }
      } else if (error.message) {
        // For network errors or other unknown issues
        console.log("An unknown error occurred:", error.message);
        toast.error(error.message);
      } else {
        console.log("Unexpected error format:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };
  return (
    <section id="login">
      <div className="container mx-auto h-full w-[95%] p-4">
        <div className="bg-white px-6 py-2 w-full max-w-sm mx-auto">
          <div className="w-20 h-20  mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profile_pic || signInImg} alt="signIn" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 w-full bg-slate-200 pb-6 pt-2 absolute bottom-0 cursor-pointer">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid
           gap-4"
          >
            <div>
              <label>Email:</label>
              <div className="bg-slate-200 p-2">
                <input
                  type="email"
                  placeholder="enter email..."
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password..."
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer text-xl"
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600 mt-1"
              >
                Forgot Password
              </Link>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all duration-300 mx-auto block"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          <p className="my-5 flex gap-1">
            Don't have accout?
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:text-red-700 hover:underline transition-all duration-200"
            >
              Sign Up
            </Link>
          </p>
          <p className="text-red-600 mt-5">
            {error && "Something went wrong!"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
