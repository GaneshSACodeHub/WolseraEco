import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import wolf from "../assets/LoadingWolf.png";

function Loading() {
  const navigate = useNavigate();
  const location = useLocation();

  const { message, redirect } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirect || "/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, redirect]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* Animated Purple Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#9257c3]/20 rounded-full blur-3xl animate-pulseBg"></div>

      <div className="relative z-10 flex flex-col items-center text-center">

        {/* Wolf Logo */}
        <img
          src={wolf}
          alt="Wolsera"
          className="w-[220px] mb-10 animate-glow"
        />

        {/* Dynamic Text */}
        <p className="text-white text-base tracking-[0.2em] uppercase mb-8">
          {message || "Loading..."}
        </p>

        {/* Loading Line */}
        <div className="w-[250px] h-[3px] bg-gray-800 overflow-hidden rounded-full">
          <div className="h-full bg-gradient-to-r from-[#9257c3] to-purple-400 animate-loadingBar"></div>
        </div>

      </div>

    </div>
  );
}

export default Loading;