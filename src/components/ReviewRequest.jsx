import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addConnectionRequests,
  removeConnectionRequests,
} from "../utils/connectionRequestsSlice";
import UserCard from "./UserCard";

const ReviewRequest = () => {
  const dispatch = useDispatch();
  const connectionRequests = useSelector((store) => store.connectionRequests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });

      const receivedRequests = res?.data?.data;
      // const requestingUsers = receivedRequests?.map((item) => item?.fromUserId);

      dispatch(addConnectionRequests(receivedRequests));
    } catch (err) {
      console.error(err?.response?.data);
    }
  };

  const handleRequestReview = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeConnectionRequests(_id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Return null if data hasn't finished evaluating yet (prevents layout flash)
  if (!connectionRequests) return null;

  const renderActions = (_id) => {
    return (
      <div className="flex gap-3 border-t border-gray-100 p-4 w-full mt-auto">
        <button
          type="button"
          className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 active:scale-95"
          onClick={() => {
            handleRequestReview("rejected", _id);
          }}
        >
          Reject
        </button>

        <button
          type="button"
          className="flex-1 rounded-lg bg-[#196293] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#145078] active:scale-95 shadow-sm"
          onClick={() => {
            handleRequestReview("accepted", _id);
          }}
        >
          Accept
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-164px)] bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Connection Requests
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            People who want to connect with you on DevTinder
          </p>
        </div>

        {/* Conditional Content Rendering */}
        {connectionRequests.length === 0 ? (
          /* Clean Industry Standard Empty State Box */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
              <svg
                xmlns="http://w3.org"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="360"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">
              No requests yet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              When developers invite you to connect, they'll show up right here.
            </p>
          </div>
        ) : (
          /* Connections Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {connectionRequests.map((req) => (
              <UserCard
                key={req._id}
                user={req.fromUserId}
                renderActions={() => renderActions(req?._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewRequest;
