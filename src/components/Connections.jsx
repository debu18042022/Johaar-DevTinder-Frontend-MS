import React, { use, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import UserCard from "./UserCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return null;

  const renderActions = (user) => {
    return (
      <>
        <button
          type="button"
          className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >
          View Profile
        </button>

        <button
          type="button"
          className="flex-1 rounded-lg bg-[#196293] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#145078]"
        >
          Message
        </button>
      </>
    );
  };

  return (
    <div className="min-h-[calc(100vh-164px)] bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Your Connections
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            People you've connected with on DevTinder
          </p>
        </div>

        {/* Connections Grid */}
        {
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {connections.map((user) => (
              <UserCard key={user._id} user={user} renderActions={renderActions} />
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Connections;
