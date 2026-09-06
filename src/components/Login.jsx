import React from "react";
import logo from "../assets/logowithout_bg.png";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("sujeet@gmail.com");
  const [password, setPassword] = useState("Sujeet@1234");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true, // I want to allow cookies/credentials for this cross-origin request.
        },
      );

      const loggedInUser = res?.data?.data;
      dispatch(addUser(loggedInUser));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
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

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Email</label>

            <input
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#196293] focus:ring-1 focus:ring-[#196293]"
              type="email"
              placeholder="Enter your email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Password</label>

            <input
              className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#196293] focus:ring-1 focus:ring-[#196293]"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-[#196293] text-white py-2 rounded-lg font-medium cursor-pointer hover:bg-[#15547D] transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span className="text-[#196293] font-medium cursor-pointer">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
