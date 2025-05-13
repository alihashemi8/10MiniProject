import React, { useState, useEffect } from "react";
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
  const [darkMode, setDarkMode] = useState(false);

  // Load the theme preference from localStorage when the component mounts
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

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

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <div
      className={`m-4 max-w-md mx-auto rounded-xl p-8 space-y-6 transition-all duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Dark Mode Toggle Button */}
      <div className="flex justify-end">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg transition-all ${
            darkMode
              ? "bg-gray-600 text-white hover:bg-indigo-700"
              : "bg-gray-600 text-white hover:bg-indigo-700"
          }`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

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
            <div className="w-28 h-28 rounded-full bg-gray-600 dark:bg-gray-500 flex items-center justify-center ring-2 ring-gray-500">
              <FiUser className="text-gray-300 text-4xl" />
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

      {/* Info Form or Display */}
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
<input
  type="text"
  name="firstName"
  placeholder="First Name"
  value={profile.firstName}
  onChange={handleChange}
  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400
             bg-gray-900 text-gray-800 
             dark:bg-gray-600 dark:text-white dark:border-gray-500"
/>

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={profile.lastName}
            onChange={handleChange}
            className="w-full bg-white dark:bg-gray-600 border border-gray-600 dark:border-gray-500 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="nationalId"
            placeholder="National ID"
            value={profile.nationalId}
            onChange={handleChange}
            className="w-full bg-white dark:bg-gray-600 border border-gray-600 dark:border-gray-500 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={profile.phone}
            onChange={handleChange}
            className="w-full bg-white dark:bg-gray-600 border border-gray-600 dark:border-gray-500 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
            className="w-full bg-white dark:bg-gray-600 border border-gray-600 dark:border-gray-500 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

          {/* Save Button */}
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
          <p className="text-gray-300">National ID: {profile.nationalId}</p>
          <p className="text-gray-300">Phone: {profile.phone}</p>
          <p className="text-gray-300">Email: {profile.email}</p>
          <p className="text-gray-300">Gender: {profile.gender}</p>
          <button
            onClick={handleEdit}
            className="mt-4 px-6 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
