import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { loginUser } from "../Services/authService";
import { useCart } from "../context/CartContext";
import signinImage from "../assets/signupImg5.png";
import { motion } from "framer-motion";

function Signin() {
  const navigate = useNavigate();
  const { loadCart } = useCart();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(formData);
      const token = response.data.token;

      localStorage.setItem("token", token);

      // ✅ Professional fix:
      // reload cart immediately after login
      await loadCart();

      navigate("/loading", {
        state: {
          message: "Preparing your shopping experience...",
          redirect: "/home"
        }
      });

    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#020617]">

      {/* LEFT SIDE FORM */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-center px-10 pt-12 pb-7"
      >

        <div className="w-full max-w-sm text-white">

          <h2 className="text-2xl font-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-400 mb-8 text-sm">
            Sign in to continue shopping with Wolsera.
          </p>

          {error && (
            <p className="text-red-400 text-center mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-300">
                Email Address
              </label>

              <div className="relative mt-2">

                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  className="w-full pl-10 py-2.5 rounded-xl bg-[#0f172a] border border-[#1e293b]
                  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-300">
                Password
              </label>

              <div className="relative mt-2">

                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full pl-10 py-2.5 rounded-xl bg-[#0f172a] border border-[#1e293b]
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>

              </div>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-400 hover:text-white transition"
              >
                Forgot your password?
              </Link>
            </div>

            {/* SIGNIN BUTTON */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-semibold text-white
              bg-gradient-to-r from-blue-500 to-purple-600
              hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/30
              active:scale-95 transition duration-200"
            >
              Sign In
            </button>

          </form>

          <p className="text-sm text-center mt-6 text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:underline underline-offset-4 transition"
            >
              Sign Up
            </Link>
          </p>

        </div>

      </motion.div>


      {/* RIGHT SIDE IMAGE */}
      <div className="hidden lg:block relative">

        <img
          src={signinImage}
          alt="Signin"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative z-10 flex flex-col justify-end h-full p-16 text-white"
        >

          <h2 className="text-4xl font-bold mb-4">
            Welcome Back to Wolsera.
          </h2>

          <p className="text-gray-300 max-w-md">
            Discover premium fashion and elevate your everyday style with curated collections.
          </p>

        </motion.div>

      </div>

    </div>
  );
}

export default Signin;