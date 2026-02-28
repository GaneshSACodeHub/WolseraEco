import React from "react";
import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="w-60 bg-zinc-900 text-white flex flex-col p-6">

      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10 tracking-wider">
        WOLSERA
        <span className="block text-sm text-zinc-400 font-normal">
          Admin Panel
        </span>
      </h1>

      {/* Menu */}
      <nav className="flex flex-col gap-4 text-sm">

        <Link
          to="/admin/dashboard"
          className="hover:bg-zinc-800 px-4 py-2 rounded-lg transition"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="hover:bg-zinc-800 px-4 py-2 rounded-lg transition"
        >
          Products
        </Link>

        <Link
          to="/admin/categories"
          className="hover:bg-zinc-800 px-4 py-2 rounded-lg transition"
        >
          Categories
        </Link>

        <button
          className="mt-10 bg-red-600 hover:bg-red-700 py-2 rounded-lg transition"
        >
          Logout
        </button>

      </nav>

    </div>
  );
}

export default AdminSidebar;