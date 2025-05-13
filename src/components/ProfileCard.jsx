import React, { useState } from "react";
import { FiUser } from "react-icons/fi";

const ProfileCard = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    nationalId: "",
    phone: "",
    email: "",
    gender: "",
    image: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  return (
    <div className="m-4 max-w-md mx-auto rounded-xl p-8 space-y-6 bg-white text-gray-900 shadow-xl transition-all duration-300">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <label htmlFor="imageUpload" className="cursor-pointer relative">
          {profile.image ? (
            <img
              src={profile.image}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover ring-2 ring-indigo-400"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center ring-2 ring-gray-400">
              <FiUser className="text-gray-600 text-4xl" />
            </div>
          )}
        </label>
        {!submitted && (
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        )}
      </div>

      {/* Form or Info Display */}
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={profile.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={profile.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="nationalId"
            placeholder="National ID"
            value={profile.nationalId}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={profile.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Gender */}
          <div>
            <p className="mb-2 font-medium">Gender</p>
            <div className="flex items-center gap-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={profile.gender === "Male"}
                  onChange={handleChange}
                  className="accent-indigo-500"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={profile.gender === "Female"}
                  onChange={handleChange}
                  className="accent-indigo-500"
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="space-y-3 text-center">
          <p className="text-lg font-semibold">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="text-gray-600">National ID: {profile.nationalId}</p>
          <p className="text-gray-600">Phone: {profile.phone}</p>
          <p className="text-gray-600">Email: {profile.email}</p>
          <p className="text-gray-600">Gender: {profile.gender}</p>
          <button
            onClick={handleEdit}
            className="mt-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
