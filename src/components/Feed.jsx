import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import Cards from "./Cards";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getFeed = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(`${BASE_URL}/user/feed?page=1&limit=20`, {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleIgnoreAndInterested = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeFeed(_id));
      setCurrentIndex((prev) => prev + 1);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!feed?.length) {
    return (
      <div className="flex min-h-[calc(100vh-164px)] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No more developers
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Check back later for new developers.
          </p>
        </div>
      </div>
    );
  }

  const currentUser = feed[currentIndex];

  return (
    <div className="min-h-[calc(100vh-164px)] bg-gray-50 px-6 py-8">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Discover Developers
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Find developers you'd like to connect with
          </p>
        </div>

        <Cards user={currentUser} />

        <div className="mt-6 flex items-center justify-center gap-8">
          <button
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-gray-500 shadow-lg transition hover:scale-110 hover:text-red-500 cursor-pointer"
            onClick={() => {
              handleIgnoreAndInterested("ignored", currentUser?._id);
            }}
          >
            ✕
          </button>

          <button
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-[#196293] shadow-lg transition hover:scale-110 cursor-pointer"
            onClick={() => {
              handleIgnoreAndInterested("interested", currentUser?._id);
            }}
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
