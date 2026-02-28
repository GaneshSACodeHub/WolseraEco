import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Classic Black Jacket",
      brand: "Wolsera",
      gender: "Men",
      description:
        "A premium black jacket crafted with high-quality fabric for a modern and stylish look.",
      images: [
        "https://picsum.photos/800/1000?random=1",
        "https://picsum.photos/800/1000?random=11"
      ],
      variants: [
        { id: 1, size: "S", price: 1999, stock: 5 },
        { id: 2, size: "M", price: 2199, stock: 3 }
      ]
    }
  ];

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/signin");
    else navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-white px-6 py-16">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT - Image Gallery */}
        <div>
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full rounded-xl shadow-md mb-4"
          />

          <div className="flex gap-3">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-24 object-cover rounded-lg cursor-pointer border 
                  ${selectedImage === img ? "border-black" : "border-gray-300"}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT - Details */}
        <div className="flex flex-col">

          <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
            {product.brand}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {product.name}
          </h1>

          <span className="inline-block bg-zinc-100 text-zinc-800 text-xs px-3 py-1 rounded-full mb-4 w-fit">
            {product.gender}
          </span>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3">Select Size</p>
            <div className="flex gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-2 border rounded-lg transition
                    ${selectedVariant.id === variant.id
                      ? "bg-black text-white"
                      : "hover:bg-zinc-100"}`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold text-black">
              ₹{selectedVariant.price}
            </span>
          </div>

          <p className={`mb-6 font-medium ${selectedVariant.stock > 0 ? "text-green-600" : "text-red-600"}`}>
            {selectedVariant.stock > 0 ? "✔ In Stock" : "❌ Out of Stock"}
          </p>

          {/* Quantity */}
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

          <button
            className="w-full bg-black text-white py-3 rounded-lg mb-4 
                       hover:bg-zinc-800 transition duration-300"
          >
            Add to Cart
          </button>

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