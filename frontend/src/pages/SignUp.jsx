import React, { useState } from "react";
import signInImg from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import summaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirm_password: "",
    profile_pic: "",
  });
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Handle input values
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleUploadPic = (e) => {
    const file = e.target.files[0];
    setData((prevData) => ({
      ...prevData,
      profile_pic: file, // Store the file directly
    }));

    const imageUrl = URL.createObjectURL(file);
    setProfilePicUrl(imageUrl);
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (data.password !== data.confirm_password) {
        setError(true);
        toast.error("Passwords do not match.");
        return;
      }

      setError(false);
      setLoading(true);

      const formData = new FormData(); // Create FormData to send the file and data
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.profile_pic) {
        formData.append("profile_pic", data.profile_pic);
      }

      const response = await axios.post(summaryApi.signUP.url, formData, {
        withCredentials: true,
      });

      const result = response.data;

      if (result.success) {
        toast.success(result.message);
        navigate("/login");
      } else {
        setError(true);
        toast.error(
          result.message || "Something went wrong. Please try again."
        );
      }

      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);

      if (error.response) {
        // The request was made and the server responded with a status code
        const errorMessage =
          error.response.data.message || "An unexpected error occurred.";
        toast.error(errorMessage);
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error(
          "Network error. Please check your connection and try again."
        );
      }

      console.log(error);
    }
  };

  return (
    <section id="signup">
      <div className="container mx-auto h-full w-[95%] p-4">
        <div className="bg-white px-6 py-2 w-full max-w-sm mx-auto">
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="grid gap-4"
            encType="multipart/form-data"
          >
            <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
              <div>
                <img src={profilePicUrl || signInImg} alt="signIn" />
              </div>
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
            </div>

            <div>
              <label>Name:</label>
              <div className="bg-slate-200 p-2">
                <input
                  type="text"
                  placeholder="enter your name..."
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
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
            </div>
            <div>
              <label>Confirm Password:</label>
              <div className="bg-slate-200 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="confirm password..."
                  name="confirm_password"
                  value={data.confirm_password}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="cursor-pointer text-xl"
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all duration-300 mx-auto block"
            >
              {loading ? "Loading..." : "SignUp"}
            </button>
          </form>
          <p className="my-5 flex gap-1">
            Already have an account?
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline transition-all duration-200"
            >
              Sign In
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

export default SignUp;
