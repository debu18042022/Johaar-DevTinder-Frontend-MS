import React from "react";
import logo from "../assets/Logo.png";

const Navbar = () => {
  return (
    <nav className=" bg-[#bbe5ec] w-full h-16 p-2 flex items-center justify-between">
      <div className="flex-1">
        <button className="px-4 cursor-pointer">
          <img src={logo} alt="DevTinder Logo" className="h-10" w-auto></img>
        </button>
      </div>
      <div className="flex justify-between gap-2">
        <input
          className="border border-gray-400 rounded-lg px-3 py-2 outline-none focus:border-[#196293] focus:ring-1 focus:ring-[#196293]"
          type="text"
          placeholder="Search"
        />
        <div className="w-12 h-12 rounded-full flex items-center justify-center gap-2">
          <img
            className="border-white rounded-full"
            src="https://media.licdn.com/dms/image/v2/D4D03AQFspVrUnRn2aw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1695533019952?e=2147483647&v=beta&t=xiIP0JMk3CrGUKqWsITB9NC0cjdSjHg29LxA3FxIBx8"
            alt="sujeet_sahu"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
