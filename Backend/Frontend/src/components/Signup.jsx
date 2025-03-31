import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function SignUp() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (confirmPassword) {
      if (password !== confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
      } else {
        clearErrors("confirmPassword");
      }
    }
  }, [password, confirmPassword, setError, clearErrors]);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const userInfo = {
      fullname: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        if (response?.data) {
          toast.success("Account created successfully");
          // setAuthUser(response.data);
          navigate("/login");

        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-sm bg-gray-900 p-6 rounded-lg border border-gray-300 shadow-2xl">
        <h2 className="text-xl font-bold text-center text-gray-200 mb-3">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="mb-3">
            <label className="block text-gray-400 text-sm font-medium mb-1">
              Name
            </label>
            <div className="flex items-center border border-gray-600 rounded-md px-2 py-2 bg-gray-700">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="text"
                className="w-full bg-transparent text-white focus:outline-none"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
              />
            </div>
            {errors.name && (
              <span className="text-red-500 text-sm font-semibold mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block text-gray-400 text-sm font-medium mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-600 rounded-md px-2 py-2 bg-gray-700">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                type="email"
                className="w-full bg-transparent text-white focus:outline-none"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-sm font-semibold mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-gray-400 text-sm font-medium mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-600 rounded-md px-2 py-2 bg-gray-700">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                className="w-full bg-transparent text-white focus:outline-none"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm font-semibold mt-1 block">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="block text-gray-400 text-sm font-medium mb-1">
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-600 rounded-md px-2 py-2 bg-gray-700">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                className="w-full bg-transparent text-white focus:outline-none"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                })}
              />
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm font-semibold mt-1 block">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-bold text-lg rounded-md hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
