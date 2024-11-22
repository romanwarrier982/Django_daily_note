import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signup } from "../services/api";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signup(data);
      alert("Registration successful!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Registration failed:", error.response?.data);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <h3 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
          Sign Up
        </h3>

        {/* Username */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Username
          </label>
          <input
            id="username"
            {...register("username", { required: true })}
            className={`mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md border ${
              errors.username
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:ring-1 outline-none`}
            placeholder="Username"
          />
          {errors.username && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            id="email"
            {...register("email", { required: true })}
            type="email"
            className={`mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md border ${
              errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:ring-1 outline-none`}
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            {...register("password", { required: true })}
            type="password"
            className={`mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md border ${
              errors.password
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:ring-1 outline-none`}
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label
            htmlFor="password2"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Confirm Password
          </label>
          <input
            id="password2"
            {...register("password2", { required: true })}
            type="password"
            className={`mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md border ${
              errors.password2
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:ring-1 outline-none`}
            placeholder="Confirm Password"
          />
          {errors.password2 && (
            <span className="text-sm text-red-500">This field is required</span>
          )}
        </div>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
          >
            Login
          </Link>
        </p>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
