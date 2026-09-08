import React from "react";

const Cards = ({ user }) => {
  return (
    <div className="w-80 h-[520px] overflow-hidden rounded-2xl bg-white shadow-xl">
      {/* Profile Image */}
      <div className="relative h-80">
        <img
          src={user.photoUrl}
          alt={`${user.firstName} ${user.lastName}`}
          className="h-full w-full"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/70 to-transparent" />

        {/* Name + Age */}
        <div className="absolute bottom-4 left-5 text-white">
          <h2 className="text-2xl font-semibold">
            {user.firstName} {user.lastName}
            {user.age && <span className="ml-2 font-normal">{user.age}</span>}
          </h2>

          {user.gender && (
            <p className="mt-1 text-sm capitalize text-gray-200">
              {user.gender}
            </p>
          )}
        </div>
      </div>

      {/* Profile Details */}
      <div className="h-50 p-5 overflow-auto [ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        {/* About */}
        {user.about && (
          <div className="mb-5">
            <h3 className="mb-2 text-sm font-semibold text-gray-500 uppercase">
              About
            </h3>

            <p className="text-sm leading-6 text-gray-700">{user.about}</p>
          </div>
        )}

        {/* Skills */}
        {user.skills?.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-500 uppercase">
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[#bbe5ec] px-3 py-1 text-xs font-medium text-[#196293]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;