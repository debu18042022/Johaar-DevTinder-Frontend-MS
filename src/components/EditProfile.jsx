import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
    gender: user?.gender || "",
    photoUrl: user?.photoUrl || "",
    about: user?.about || "",
    skills: user?.skills?.join(", ") || "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsSaving(true);

    try {
      const skillsArray = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          ...formData,
          skills: skillsArray, // override string skills with parsed array
        },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data?.data));
      setSuccessMessage("Profile updated successfully.");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-80 h-[520px] rounded-2xl bg-white shadow-xl flex flex-col">
      <div className="p-6 pb-4">
        <h2 className="text-xl font-semibold text-gray-800">Edit Profile</h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your profile information
        </p>
      </div>

      <form onSubmit={saveProfile} className="flex flex-1 min-h-0 flex-col">
        <div className="flex-1 min-h-0 overflow-y-auto px-6">
          <div className="flex flex-col gap-4">
            {/* First Name - Notice the matching 'name' attribute */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#196293] focus:ring-1 focus:ring-[#196293]"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#196293] focus:ring-1 focus:ring-[#196293]"
              />
            </div>

            {/* Age */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#196293] focus:ring-1 focus:ring-[#196293]"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#196293] focus:ring-1 focus:ring-[#196293]"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Photo URL */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Photo URL
              </label>
              <input
                type="url"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#196293] focus:ring-1 focus:ring-[#196293]"
              />
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Skills
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, JavaScript, Node.js"
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#196293] focus:ring-1 focus:ring-[#196293]"
              />
              <span className="text-xs text-gray-400">
                Separate skills with commas
              </span>
            </div>

            {/* About */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows={4}
                className="resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#196293] focus:ring-1 focus:ring-[#196293]"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            {successMessage && (
              <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-600">
                {successMessage}
              </p>
            )}
          </div>
        </div>

        <div className="p-6 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full rounded-lg bg-[#196293] px-4 py-2 font-medium text-white transition hover:bg-[#15527d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
