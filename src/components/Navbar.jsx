import React, { useState, useEffect } from "react";
import { User, ShoppingCart, Package, LogOut, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { fetchCategoryTree } from "../Services/productService";
import { ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const cartCount = cartItems.length;

const [isLoggedIn, setIsLoggedIn] = useState(
  !!localStorage.getItem("token")
);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategoryTree();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

const handleLogout = () => {
  localStorage.removeItem("token");
  setOpen(false);
  window.location.reload();
};

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center px-8 py-5">

        {/* Logo */}
        <img
          src={logo}
          alt="Wolsera Logo"
          className="h-16 md:h-20 object-contain cursor-pointer"
          onClick={() => navigate("/home")}
        />

        {/* Right Menu */}
        <div className="flex items-center gap-8 text-white text-sm font-medium">

          {/* CATEGORY DROPDOWN */}
          <div className="relative">

            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="flex items-center gap-1 hover:text-gray-300 transition text-lg font-semibold"
            >
              Category

              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {categoryOpen && (
              <div
                className="
                  absolute right-0 mt-4 translate-x-62
                  w-[550px]
                  bg-black/80
                  backdrop-blur-xl
                  border border-purple-500/20
                  rounded-2xl
                  shadow-[0_0_40px_rgba(146,87,195,0.25)]
                  overflow-hidden
                  z-50
                "
              >

                {/* Header */}
                <div className="px-6 py-4 border-b border-zinc-800">
                  <h3 className="text-white font-semibold tracking-[0.25em] text-sm">
                    SHOP BY CATEGORY
                  </h3>
                </div>

                {/* Categories */}
                <div className="grid grid-cols-2 gap-8 px-8 py-4">

                  {categories.map((parent) => (
                    <div key={parent.id}>

                      <h3 className="text-2xl font-bold text-white mb-5">
                        {parent.name}
                      </h3>

                      <div className="flex flex-col gap-2">

                        {parent.children.map((child) => (
                          <button
                            key={child.id}
                            className="
                                w-full
                                text-left
                                px-3
                                py-2
                                rounded-lg
                                text-gray-300
                                hover:bg-[#9257c3]
                                hover:text-white
                                transition-all
                                duration-200
                                text-base
                            "
                            onClick={() => {
                              setCategoryOpen(false);
                              navigate(`/home?categoryId=${child.id}`);
                            }}
                          >
                            {child.name}
                          </button>
                        ))}

                      </div>

                    </div>
                  ))}

                </div>

              </div>
            )}

          </div>

          {/* MY ORDERS */}
          <button
            className="flex items-center gap-2 hover:text-gray-300 transition"
            onClick={() => navigate("/orders/my-orders")}
          >
            <Package size={18} />
            My Orders
          </button>

          {/* USER MENU */}
          <div className="relative">

            <button
              onClick={() => setOpen(!open)}
              className="hover:text-gray-300 transition"
            >
              <User size={20} />
            </button>

            {open && (
              <div className="absolute right-0 mt-4
                  w-44
                  bg-black/80
                  backdrop-blur-xl
                  border border-purple-500/20
                  rounded-xl
                  shadow-[0_0_25px_rgba(146,87,195,0.25)]
                  overflow-hidden">

                {!isLoggedIn ? (
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/signin");
                    }}
                    className=" flex items-center
                        gap-2
                        w-full
                        px-4
                        py-3
                        text-white
                        hover:bg-[#9257c3]
                        transition-all
                        duration-200
                        font-medium"
                  >
                      <LogIn size={18} />
                      <span>Signin</span>
                  </button>
                ) : (
                  <button
                    onClick={handleLogout}
                    className=" flex items-center
                      gap-2
                      w-full
                      px-4
                      py-3
                      text-white
                      hover:bg-[#9257c3]
                      transition-all
                      duration-200
                      font-medium"
                  >
                      <LogOut size={18} />
                      <span>Logout</span>
                  </button>
                )}

              </div>
            )}

          </div>

          {/* CART */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={22} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2
                  min-w-[20px]
                  h-5
                  flex items-center justify-center
                  bg-[#9257c3]
                  text-white
                  text-[11px]
                  rounded-full
                  font-bold
                  shadow-[0_0_12px_rgba(146,87,195,0.8)]">
                {cartCount}
              </span>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;