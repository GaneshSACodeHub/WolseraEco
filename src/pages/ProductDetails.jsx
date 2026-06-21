import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import axiosInstance from "../Services/api";
import { fetchProductById } from "../Services/productService";
import { addItemToCart } from "../Services/cartService";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import CartToast from "../components/CartToast";
import Navbar from "../components/Navbar";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { loadCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  // ⭐ NEW STATES
  const [myRating, setMyRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {

    try {

      const data = await fetchProductById(id);

      setProduct(data);

      // ⭐ LOAD USER RATING
      try {

        const ratingResponse = await axiosInstance.get(
          `http://localhost:8080/api/products/ratings/my/${id}`
        );

        setMyRating(ratingResponse.data);

      } catch (err) {

        console.log("No rating yet");

      }

      if (data.images.length > 0) {
        setSelectedImage(data.images[0].imageUrl);
      }

      if (data.variants.length > 0) {
        setSelectedVariant(data.variants[0]);
      }

    } catch (err) {

      console.error("Failed to load product", err);

    }
  };

  if (!product) {
    return (
      <div className="p-10 text-center text-white">
        Loading...
      </div>
    );
  }

  const handleAddToCart = async () => {

    try {

      await addItemToCart({
        variantId: selectedVariant?.id,
        quantity: quantity
      });

      // Instantly reload cart after add to cart
      await loadCart();

      setShowToast(true);

      // auto hide after 4 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 4000);

    } catch (err) {

      console.error(err);

    }
  };

  const handleBuyNow = () => {

    const token = localStorage.getItem("token");

    if (!token) navigate("/signin");
    else navigate("/payment");
  };

  // ⭐ NEW RATING FUNCTION
  const handleRating = async (rating) => {

    try {

      await axiosInstance.post(
        "http://localhost:8080/api/products/ratings",
        {
          productId: product.id,
          rating: rating
        }
      );

      setMyRating(rating);

      // reload product to refresh ratings
      loadProduct();

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data ||
        "Only purchased users can rate this product"
      );

    }

  };

  console.log(product);

  return (

    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">

      <Navbar />

      <main className="flex-grow px-10 pt-32 pb-16">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 pb-20">

          {/* LEFT SIDE IMAGES */}
          <div className="flex gap-6">

            {/* THUMBNAILS */}
            <div className="flex flex-col gap-4">

              {product.images.map((img) => (
                <img
                  key={img.id}
                  src={img.imageUrl}
                  alt="thumb"
                  onClick={() => setSelectedImage(img.imageUrl)}
                  className={`w-20 h-20 object-cover rounded-xl cursor-pointer border transition
                  hover:scale-105
                  ${selectedImage === img.imageUrl
                    ? "border-[#9257c3] shadow-lg shadow-[#9257c3]/30"
                    : "border-gray-700"}`}
                />
              ))}

            </div>

            {/* MAIN IMAGE */}
            <div className="flex-1 overflow-hidden rounded-3xl">

              <img
                src={selectedImage}
                alt={product.name}
                className="w-full rounded-3xl shadow-2xl
                transition duration-500 hover:scale-105"
              />

            </div>

          </div>



          {/* RIGHT SIDE DETAILS */}
          <div className="flex flex-col">

            <div className="flex items-center gap-3 mb-3">

              <p className="text-sm text-gray-400 uppercase tracking-[0.3em]">
                WOLSERA
              </p>

              {product.promotionType === "NEW_ARRIVAL" && (

                <span
                  className="
                    bg-emerald-500
                    text-white
                    text-xs
                    font-bold
                    px-3 py-1
                    rounded-full
                  "
                >
                  NEW ARRIVAL
                </span>

              )}

              {product.promotionType === "DISCOUNT" && (

                <span
                  className="
                    bg-red-500
                    text-white
                    text-xs
                    font-bold
                    px-3 py-1
                    rounded-full
                  "
                >
                  {product.discountPercentage}% OFF
                </span>

              )}

            </div>

            <h1 className="text-5xl font-bold mb-5 leading-tight">
              {product.name}
            </h1>

            {/* TAGS */}
            <div className="flex gap-3 mb-6">

              <span className="inline-block bg-[#1e293b]
              text-gray-300 text-xs px-4 py-2 rounded-full">
                {product.gender}
              </span>

              <span className="inline-block bg-[#1e293b]
              text-gray-300 text-xs px-4 py-2 rounded-full">
                {product.colour}
              </span>

            </div>

            <p className="text-gray-300 mb-8 leading-relaxed text-[15px]">
              {product.description}
            </p>



            {/* SIZE */}
            <div className="mb-8">

              <p className="text-sm font-medium mb-4">
                Select Size
              </p>

              <div className="flex gap-3 flex-wrap">

                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-5 py-3 rounded-xl border transition font-medium
                    ${selectedVariant?.id === variant.id
                      ? "bg-[#9257c3] border-[#9257c3] shadow-lg shadow-[#9257c3]/30"
                      : "border-gray-600 hover:border-[#9257c3]"}`}
                  >
                    {variant.size}
                  </button>
                ))}

              </div>

            </div>



            {/* PRICE */}
            <div className="flex items-center gap-4 mb-5 flex-wrap">

              {product.promotionType === "DISCOUNT" ? (

                <>

                  <span className="text-gray-400 text-2xl line-through">
                    ₹{selectedVariant?.price}
                  </span>

                  <span className="text-4xl font-bold text-red-400">

                    ₹{
                      (
                        selectedVariant?.price *
                        (100 - product.discountPercentage)
                      ) / 100
                    }

                  </span>

                  <span
                    className="
                      bg-red-500
                      text-white
                      text-sm
                      font-semibold
                      px-3 py-1
                      rounded-full
                    "
                  >
                    {product.discountPercentage}% OFF
                  </span>

                </>

              ) : (

                <span className="text-4xl font-bold">
                  ₹{selectedVariant?.price}
                </span>

              )}

            </div>



            {/* STOCK */}
            <p
              className={`mb-8 font-medium ${
                selectedVariant?.stockQuantity > 0
                  ? "text-green-400"
                  : "text-red-500"
              }`}
            >
              {selectedVariant?.stockQuantity > 0
                ? "✔ In Stock"
                : "❌ Out of Stock"}
            </p>



            {/* QUANTITY */}
            <div className="flex items-center gap-4 mb-10">

              <button
                onClick={() =>
                  setQuantity(quantity > 1 ? quantity - 1 : 1)
                }
                className="w-12 h-12 bg-[#1e293b]
                rounded-xl hover:bg-[#334155] transition"
              >
                -
              </button>

              <span className="text-lg font-semibold w-6 text-center">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 bg-[#1e293b]
                rounded-xl hover:bg-[#334155] transition"
              >
                +
              </button>

            </div>



            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2
              bg-[#9257c3]
              py-4 rounded-2xl font-semibold
              hover:bg-[#7d46af]
              hover:shadow-lg hover:shadow-[#9257c3]/30
              active:scale-[0.99]
              transition mb-4"
            >
              Add to Cart
            </button>



            {/* BUY NOW */}
            <button
              onClick={handleBuyNow}
              className="bg-white text-black py-4 rounded-2xl font-semibold
              hover:bg-gray-200 transition"
            >
              Buy Now
            </button>



            {/* TRUST INFO */}
            <div className="grid grid-cols-3 gap-4 mt-10">

              <div className="bg-[#0f172a] border border-gray-800
              rounded-2xl p-4 text-center">

                <p className="text-2xl mb-2">
                  🚚
                </p>

                <p className="text-sm text-gray-300">
                  Free Delivery
                </p>

              </div>

              <div className="bg-[#0f172a] border border-gray-800
              rounded-2xl p-4 text-center">

                <p className="text-2xl mb-2">
                  🔒
                </p>

                <p className="text-sm text-gray-300">
                  Secure Payment
                </p>

              </div>

              <div className="bg-[#0f172a] border border-gray-800
              rounded-2xl p-4 text-center">

                <p className="text-2xl mb-2">
                  🔄
                </p>

                <p className="text-sm text-gray-300">
                  Easy Returns
                </p>

              </div>

            </div>

          </div>

        </div>



        {/* ================= RATINGS SECTION ================= */}

        <div className="max-w-7xl mx-auto mt-4 pb-20">

          <div
            className="bg-[#0f172a] border border-gray-800
            rounded-3xl p-8 shadow-lg"
          >

            {/* Heading */}
            <div className="mb-8">

              <h2 className="text-3xl font-bold text-white mb-2">
                Customer Ratings
              </h2>

              <p className="text-gray-400 text-sm">
                Ratings from verified Wolsera buyers
              </p>

            </div>


            <div className="grid md:grid-cols-2 gap-14 items-center">

              {/* LEFT SIDE SUMMARY */}
              <div>

                <div className="flex items-end gap-4 mb-4">

                  <h1 className="text-6xl font-bold text-white">
                    {product.averageRating?.toFixed(1) || "0.0"}
                  </h1>

                  <div className="pb-2">

                    <div className="flex text-yellow-400 text-2xl">
                      ★★★★★
                    </div>

                    <p className="text-gray-400 text-sm mt-1">
                      Based on {product.totalRatings || 0} ratings
                    </p>

                  </div>

                </div>

                {/* USER RATING */}

                <div className="mt-8">

                  <p className="text-sm text-gray-400 mb-3">
                    Rate this product
                  </p>

                  <div className="flex items-center gap-2">

                    {[1, 2, 3, 4, 5].map((star) => (

                      <button
                        key={star}
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition hover:scale-110"
                      >

                        <Star
                          size={30}
                          className={`${
                            star <= (hoverRating || myRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          } transition`}
                        />

                      </button>

                    ))}

                  </div>

                  {myRating > 0 && (
                    <p className="text-sm text-[#9257c3] mt-3">
                      Your rating: {myRating} ★
                    </p>
                  )}

                </div>

              </div>


              {/* RIGHT SIDE DISTRIBUTION */}
              <div className="space-y-4">

                {[5, 4, 3, 2, 1].map((star) => {

                  const count = product.distribution?.[star] || 0;

                  const percentage =
                    product.totalRatings > 0
                      ? (count / product.totalRatings) * 100
                      : 0;

                  return (

                    <div
                      key={star}
                      className="flex items-center gap-4"
                    >

                      {/* Star Label */}
                      <div className="w-12 text-sm text-gray-300">
                        {star} ★
                      </div>

                      {/* Progress Bar */}
                      <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-[#9257c3] rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />

                      </div>

                      {/* Count */}
                      <div className="w-10 text-right text-sm text-gray-400">
                        {count}
                      </div>

                    </div>

                  );

                })}

              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />

      <CartToast show={showToast} message="Item added to cart" />

    </div>

  );
}

export default ProductDetails;