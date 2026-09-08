import React, { useRef, useState, useEffect } from "react";
import logo from "../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const [showDropdownContent, setShowDropdownContent] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdownContent(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setShowDropdownContent(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleLogout = async () => {
    const res = await axios.post(
      `${BASE_URL}/logout`,
      {},
      {
        withCredentials: true,
      },
    );
    dispatch(removeUser());
    setShowDropdownContent(false);
    navigate("/login");
  };

  return (
    <nav className="w-full h-16 flex items-center justify-between p-2 bg-[#bbe5ec] ">
      <div className="flex-1">
        <button
          className="px-4 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="DevTinder Logo" className="h-10 w-auto" />
        </button>
      </div>

      {user && (
        <div className="flex justify-between gap-2">
          <input
            className="border border-gray-400 rounded-lg px-3 py-2 outline-none focus:border-[#196293] focus:ring-1 focus:ring-[#196293]"
            type="text"
            placeholder="Search"
          />

          {/* Avatar + Dropdown */}
          <div
            ref={dropdownRef}
            className="relative w-12 h-12 rounded-full flex items-center justify-center"
          >
            <button
              type="button"
              onClick={() => {
                setShowDropdownContent((prev) => !prev);
              }}
              aria-haspopup="menu"
              aria-expanded={showDropdownContent}
              className="cursor-pointer"
            >
              <img
                className="border-white rounded-full"
                src={user.photoUrl}
                alt="User menu"
              />
            </button>

            <div
              className={`
                absolute top-13 right-0 w-40 rounded-lg p-2 shadow bg-white
                transition-all duration-200 ease-out
                ${
                  showDropdownContent
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible"
                }
              `}
            >
              <ul className="flex flex-col gap-1">
                <li className="rounded-sm transition-colors duration-200 hover:bg-[#196293] hover:text-white">
                  <Link
                    to="/profile"
                    onClick={() => setShowDropdownContent(false)}
                    className="block w-full p-2"
                  >
                    Profile
                  </Link>
                </li>

                <li className="rounded-sm transition-colors duration-200 hover:bg-[#196293] hover:text-white">
                  <Link
                    to="/connections"
                    onClick={() => setShowDropdownContent(false)}
                    className="block w-full p-2"
                  >
                    Connections
                  </Link>
                </li>
                <li className="rounded-sm transition-colors duration-200 hover:bg-[#196293] hover:text-white">
                  <Link
                    to="/request"
                    onClick={() => setShowDropdownContent(false)}
                    className="block w-full p-2"
                  >
                    Requests
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full text-left p-2 rounded-sm hover:bg-[#196293] hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
