import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { adminLogin } from "../Services/authService";

function AdminSignin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    secretKey: "",
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
      const response = await adminLogin(formData);

      const token = response.data;

      // Store token and role
      localStorage.setItem("token", token);
      localStorage.setItem("role", "ADMIN");

      navigate("/admin/dashboard");

    } catch (err) {
      setError("Invalid credentials or secret key");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border-4 border-zinc-900">

        <h2 className="text-3xl font-bold text-center mb-6">
          ADMIN SIGN IN
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            onChange={handleChange}
            className="w-full p-3 border border-zinc-900 rounded-lg"
          />

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
            </div>


          <input
            type="text"
            name="secretKey"
            placeholder="Secret Key"
            onChange={handleChange}
            className="w-full p-3 border border-zinc-900 rounded-lg"
          />

          <button type="submit" className="w-full bg-zinc-900 text-white py-3 rounded-xl 
           hover:bg-zinc-800 
           transition duration-300 
           cursor-pointer">
            Admin Login
          </button>

        </form>

        <p className="text-sm text-center mt-6">
          Go back to{" "}
          <Link to="/signin" className="underline text-zinc-900">
            User Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}

export default AdminSignin;
