import React from "react";

const UserCard = ({ user, renderActions }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;

  return (
    /* Added: "flex flex-col h-[450px]" to lock the total card height */
    <div className="flex flex-col h-[450px] overflow-hidden rounded-2xl bg-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      {/* Profile Section */}
      <div className="flex items-center gap-4 p-5 flex-shrink-0">
        <img
          src={photoUrl}
          alt="Profile"
          className="h-16 w-16 rounded-full object-cover ring-2 ring-[#bbe5ec]"
        />
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-gray-800">
            {`${firstName} ${lastName}`}
          </h2>
          {/* Pro-tip: Dynamically print age and gender from your state instead of hardcoding */}
          <p className="text-sm text-gray-500">
            {age} · {gender}
          </p>
        </div>
      </div>

      {/* Middle Content Wrapper (Takes remaining space & hides scrollbar track) */}
      <div className="flex-1 overflow-y-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* About */}
        <div className="border-t border-gray-100 px-5 py-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            About
          </h3>
          {/* Removed line-clamp-2 so users can scroll to read full text if it's long */}
          <p className="text-sm leading-6 text-gray-600">{about}</p>
        </div>

        {/* Skills */}
        <div className="px-5 pb-5">
          <div className="flex flex-wrap gap-2">
            {skills &&
              skills.map((skill, index) => (
                <span
                  key={index} // Added missing key prop to avoid React warnings
                  className="rounded-full bg-[#bbe5ec] px-3 py-1 text-xs font-medium text-[#196293]"
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Actions (Pinned perfectly to the bottom) */}
      <div className="mt-auto flex gap-3 border-t border-gray-100 p-4 bg-white flex-shrink-0">
        {renderActions && renderActions()}
      </div>
    </div>
  );
};

export default UserCard;
