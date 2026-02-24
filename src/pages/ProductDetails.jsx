import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Temporary Static Products (later replace with backend API)
  const products = [
    {
      id: 1,
      name: "Classic Black Jacket",
      brand: "Wolsera",
      gender: "Men",
      description:
        "A premium black jacket crafted with high-quality fabric for a modern and stylish look.",
      price: 1999,
      originalPrice: 2999,
      stock: true,
      image: "https://picsum.photos/800/1000?random=1"
    },
    {
      id: 2,
      name: "Minimal White Hoodie",
      brand: "Wolsera",
      gender: "Women",
      description:
        "Comfortable and minimal hoodie designed for everyday wear and effortless fashion.",
      price: 1499,
      originalPrice: 2499,
      stock: true,
      image: "https://picsum.photos/800/1000?random=2"
    }
  ];

  const product = products.find((p) => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
    } else {
      navigate("/payment");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-16">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT - Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl shadow-md"
          />
        </div>

        {/* RIGHT - Details */}
        <div className="flex flex-col">

          {/* Brand */}
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
            {product.brand}
          </p>

          {/* Name */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {product.name}
          </h1>

          {/* Gender Tag */}
          <span className="inline-block bg-zinc-100 text-zinc-800 text-xs px-3 py-1 rounded-full mb-4 w-fit">
            {product.gender}
          </span>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold text-black">
              ₹{product.price}
            </span>
            <span className="text-gray-500 line-through">
              ₹{product.originalPrice}
            </span>
          </div>

          {/* Stock */}
          <p className={`mb-6 font-medium ${product.stock ? "text-green-600" : "text-red-600"}`}>
            {product.stock ? "✔ In Stock" : "❌ Out of Stock"}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-8">

            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="px-4 py-2 border border-black"
            >
              -
            </button>

            <span className="text-lg font-semibold">{quantity}</span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 border border-black"
            >
              +
            </button>

          </div>

          {/* Add to Cart */}
          <button
            className="w-full bg-black text-white py-3 rounded-lg mb-4 
                       hover:bg-zinc-800 transition duration-300"
          >
            Add to Cart
          </button>

          {/* Buy Now */}
          <button
            onClick={handleBuyNow}
            className="w-full bg-green-600 text-white py-3 rounded-lg 
                       hover:bg-green-700 transition duration-300"
          >
            Buy Now
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;