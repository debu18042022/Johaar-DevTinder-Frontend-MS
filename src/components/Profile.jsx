import React from "react";

import EditProfile from "./EditProfile";
import Cards from "./Cards";

import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-164px)] flex items-center justify-center gap-8 px-6 py-10 bg-gray-50">
      <EditProfile user={user} />
      <Cards user={user} />
    </div>
  );
};

export default Profile;