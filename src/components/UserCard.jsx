import React from "react";

const UserCard = ({ user, renderActions }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      {/* Profile Section */}
      <div className="flex items-center gap-4 p-5">
        <img
          src={photoUrl}
          alt="Profile"
          className="h-16 w-16 rounded-full object-cover ring-2 ring-[#bbe5ec]"
        />

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-gray-800">
            {`${firstName} ${lastName}`}
          </h2>

          <p className="text-sm text-gray-500">28 · Male</p>
        </div>
      </div>

      {/* About */}
      <div className="border-t border-gray-100 px-5 py-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
          About
        </h3>

        <p className="line-clamp-2 text-sm leading-6 text-gray-600">{about}</p>
      </div>

      {/* Skills */}
      <div className="px-5 pb-5">
        <div className="flex flex-wrap gap-2">
          {skills &&
            skills.map((skill) => (
              <span className="rounded-full bg-[#bbe5ec] px-3 py-1 text-xs font-medium text-[#196293]">
                {skill}
              </span>
            ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 border-t border-gray-100 p-4">
        {renderActions && renderActions()}
      </div>
    </div>
  );
};

export default UserCard;
