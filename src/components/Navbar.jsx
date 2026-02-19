import React from "react";
import { User, ShoppingCart, Package } from "lucide-react";
import logo from "../assets/logo.png"; // your white transparent logo

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center px-8 py-5">

        {/* Left - Logo */}
        <img
          src={logo}
          alt="Wolsera Logo"
          className="h-16 md:h-20 object-contain cursor-pointer"
        />

        {/* Right - Menu */}
        <div className="flex items-center gap-8 text-white text-sm font-medium">

          <button className="hover:text-gray-300 transition">
            Category
          </button>

          <button className="flex items-center gap-2 hover:text-gray-300 transition">
            <Package size={18} />
            My Orders
          </button>

          <button className="hover:text-gray-300 transition">
            <User size={20} />
          </button>

          <div className="relative cursor-pointer">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-white text-black text-xs px-1.5 rounded-full font-semibold">
              0
            </span>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
