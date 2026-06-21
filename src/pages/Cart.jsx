import { useCart } from "../context/CartContext";
import { Trash2, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Cart() {
  const {
    cartItems,
    cartTotal,
    removeItem,
    updateQuantity,
    clearCart,
    checkout
  } = useCart();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">

      <Navbar />

      <main className="flex-grow px-10 pt-32 pb-16">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 pb-30">

          {/* LEFT SIDE CART ITEMS */}
          <div className="lg:col-span-2">

            {/* 🔥 FIXED TITLE SECTION */}
            <div className="mb-10 text-center">

              <div className="flex items-center justify-center gap-4">
                <ShoppingCart 
                  className="text-[#9257c3] drop-shadow-[0_0_8px_#9257c3]" 
                  size={32} 
                />
                <h1 className="text-4xl font-bold tracking-[0.1em]">
                  SHOPPING CART
                </h1>
              </div>

              {/* Underline */}
              <div className="w-30 h-[2px] bg-[#9257c3] mt-4 mx-auto"></div>

            </div>

            {cartItems.length === 0 ? (
              <p className="text-gray-400">
                Your cart is empty.
              </p>
            ) : (

              <div className="space-y-10">

                {cartItems.map((item) => (

                  <div
                    key={item.cartItemId}
                    className="flex justify-between items-center border-b border-gray-800 pb-8"
                  >

                    {/* PRODUCT INFO */}
                    <div className="flex gap-6">

                      <img
                        src={item.imageUrls?.[0]}
                        alt={item.productName}
                        className="w-24 h-24 object-cover rounded-lg"
                      />

                      <div>

                        <h2 className="text-lg font-semibold">
                          {item.productName}
                        </h2>

                        <p className="text-gray-400 text-sm mt-1">
                          Size: {item.size} | Color: {item.color}
                        </p>

                        {/* REMOVE */}
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="flex items-center gap-1 text-red-500 text-sm mt-3 hover:text-red-400"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>

                      </div>

                    </div>


                    {/* QUANTITY */}
                    <div className="flex items-center gap-4">

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.cartItemId,
                            item.quantity > 1 ? item.quantity - 1 : 1
                          )
                        }
                        className="w-10 h-10 rounded-md bg-[#1e293b] hover:bg-[#334155]"
                      >
                        -
                      </button>

                      <span className="w-8 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.cartItemId,
                            item.quantity + 1
                          )
                        }
                        className="w-10 h-10 rounded-md bg-[#1e293b] hover:bg-[#334155]"
                      >
                        +
                      </button>

                    </div>


                    {/* PRICE */}
                    <div className="text-lg font-semibold">
                      ₹{item.total}
                    </div>

                  </div>

                ))}

              </div>
            )}

            {/* CART ACTIONS */}
            <div className="flex gap-6 mt-12">

              <button
                onClick={clearCart}
                className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700"
              >
                Clear Cart
              </button>

              <button
                onClick={() => navigate("/home")}
                className="border border-gray-500 px-6 py-3 rounded-lg hover:bg-gray-800"
              >
                Continue Shopping
              </button>

            </div>

          </div>



          {/* ORDER SUMMARY */}
          <div className="bg-[#0f172a] rounded-2xl p-8 h-fit shadow-lg">

            <h2 className="text-2xl font-semibold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-gray-300">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>

              <div className="border-t border-gray-700 pt-4 flex justify-between text-xl font-semibold text-white">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>

            </div>

            {/* CHECKOUT BUTTON */}
            <button
              onClick={() => navigate("/checkout")}
              className="mt-8 w-full py-3 rounded-xl font-semibold
              bg-gradient-to-r from-blue-500 to-purple-600
              hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/30
              transition"
            >
              Proceed to Checkout →
            </button>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Cart;