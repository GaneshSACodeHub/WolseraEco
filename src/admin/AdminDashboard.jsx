import React from "react";
import AdminLayout from "./AdminLayout";
import logo from "../assets/logo.png";

function AdminDashboard() {
  return (
    <AdminLayout>

      {/* 🔥 Full height wrapper for proper vertical centering */}
      <div className="relative min-h-screen px-6 py-10">

        {/* 🔥 WATERMARK BACKGROUND */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src={logo}
            alt="Wolsera"
            className="w-[550px] opacity-20 select-none"
          />
        </div>

        {/* 🔥 CONTENT */}
        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-zinc-900">
              Dashboard
            </h2>
            <p className="text-gray-500 mt-1">
              Welcome to Wolsera Admin
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white shadow-md rounded-xl p-6 border">
              <h3 className="text-gray-500 text-sm mb-2">
                Total Products
              </h3>
              <p className="text-3xl font-bold text-zinc-900">
                24
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 border">
              <h3 className="text-gray-500 text-sm mb-2">
                Active Products
              </h3>
              <p className="text-3xl font-bold text-zinc-900">
                18
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 border">
              <h3 className="text-gray-500 text-sm mb-2">
                Total Categories
              </h3>
              <p className="text-3xl font-bold text-zinc-900">
                6
              </p>
            </div>

          </div>

        </div>
      </div>

    </AdminLayout>
  );
}

export default AdminDashboard;