import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { signupUser } from "./Services/authService";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && !/^\d*$/.test(value)) return;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    try {
      const response = await signupUser(formData);

      setMessage(response.data);

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
      });

      setTimeout(() => {
        navigate("/signin");
      }, 1500);

    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
      } else {
        setMessage("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border-4 border-zinc-900">

        <h2 className="text-3xl font-bold text-center text-zinc-900">
          SIGN UP
        </h2>

        {/* 🔥 Brand Quote */}
        <p className="text-center text-zinc-600 text-sm mt-2 mb-6 tracking-wide">
          Elevate Shopping with{" "}
          <span className="font-semibold text-zinc-900">
            Wolsera
          </span>
        </p>

        {message && (
          <p className="text-green-600 text-center mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-zinc-900 rounded-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-zinc-900 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-zinc-900 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-900 transition cursor-pointer"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              maxLength="10"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-zinc-900 rounded-lg"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-900 text-white py-3 rounded-xl 
                       hover:bg-zinc-800 
                       transition duration-300 
                       cursor-pointer"
          >
            Create Account
          </button>

        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="underline text-zinc-900">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;
