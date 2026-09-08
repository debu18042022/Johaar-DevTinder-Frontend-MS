import React from "react";
import logo from "../assets/logowithout_bg.png";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });

  const { firstName, lastName, emailId, password } = credentials;

  const handleLogin = async () => {
    const res = await axios.post(`${BASE_URL}/login`, { emailId, password }, { withCredentials: true });
    dispatch(addUser(res?.data?.data));
    navigate("/");
  };

  const handleSignUp = async () => {
    const res = await axios.post(`${BASE_URL}/signup`, { ...credentials }, { withCredentials: true });
    dispatch(addUser(res?.data?.data));
    navigate("/profile");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent duplicate submissions if already loading
    if (isLoading) return; 
  
    setIsLoading(true);
    setError(""); // Clear previous errors
  
    try {
      if (showLogin) {
        await handleLogin();
      } else {
        await handleSignUp();
      }
    } catch (err) {
      // Single, centralized place to catch errors from BOTH login and signup
      setError(err?.response?.data?.message || err?.response?.data || "An error occurred");
      console.error("Authentication error:", err);
    } finally {
      // This blocks runs NO MATTER WHAT (success or failure) to unlock the button
      setIsLoading(false); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-[calc(100vh-164px)] flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <img src={logo} alt="DevTinder" className="h-16 w-auto mx-auto mb-4" />

        <h1 className="text-2xl font-semibold text-center text-[#196293]">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-1 mb-6">
          Login to continue to DevTinder
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!showLogin && (
            <>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">First Name</label>

                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#196293] focus:ring-1 focus:ring-[#196293]"
                  type="text"
                  name="firstName"
                  placeholder="Enter your First Name"
                  value={credentials.firstName}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Last Name</label>

                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#196293] focus:ring-1 focus:ring-[#196293]"
                  type="text"
                  name="lastName"
                  placeholder="Enter your Last Name"
                  value={credentials.lastName}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </>
          )}

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Email</label>

            <input
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#196293] focus:ring-1 focus:ring-[#196293]"
              type="email"
              name="emailId"
              placeholder="Enter your email"
              value={credentials.emailId}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Password</label>

            <input
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#196293] focus:ring-1 focus:ring-[#196293]"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-[#196293] text-white py-2 rounded-lg font-medium cursor-pointer hover:bg-[#15547D] transition"
          >
            {showLogin ? "Login" : "Sign up"}
          </button>
        </form>

        <p className="text-red-600 mt-2">{error} </p>

        <p className="text-center text-sm text-gray-500 mt-6">
          {showLogin ? "Don't have an account? " : "Already have an account? "}

          <button
            className="text-[#196293] font-medium cursor-pointer"
            onClick={() => {
              showLogin ? setShowLogin(false) : setShowLogin(true);
            }}
          >
            {showLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
