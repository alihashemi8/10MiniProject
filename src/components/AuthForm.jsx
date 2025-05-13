import React, { useState } from "react";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [profile, setProfile] = useState({
    identifier: "",       // برای لاگین
    username: "",          // برای ثبت‌نام
    email: "",             // برای ثبت‌نام
    password: "",
    confirmPassword: "",   // فقط برای ثبت‌نام
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin && profile.password !== profile.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // پردازش لاگین یا ثبت‌نام...
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl bg-white text-gray-900 rounded-2xl shadow-xl p-8 sm:p-10 space-y-8 transition-all duration-300">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isLogin ? (
            <input
              type="text"
              name="identifier"
              placeholder="Username or Email"
              value={profile.identifier}
              onChange={handleChange}
              className="w-full px-5 py-3 text-base rounded-xl border bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ) : (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={profile.username}
                onChange={handleChange}
                className="w-full px-5 py-3 text-base rounded-xl border bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-5 py-3 text-base rounded-xl border bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={profile.password}
            onChange={handleChange}
            className="w-full px-5 py-3 text-base rounded-xl border bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={profile.confirmPassword}
              onChange={handleChange}
              className="w-full px-5 py-3 text-base rounded-xl border bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-sm md:text-base">
          {isLogin ? "Don’t have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin((prev) => !prev)}
            className="text-blue-600 font-medium hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
