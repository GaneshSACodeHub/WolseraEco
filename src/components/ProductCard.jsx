import React from "react";

function ProductCard({ product, onAddToCart }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden 
                 flex flex-col justify-between 
                 h-[460px] 
                 transition duration-300 
                 hover:-translate-y-2 hover:shadow-xl"
    >

      {/* Image Section */}
      <div className="overflow-hidden h-[260px]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover 
                     transition duration-300 hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">

        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="text-base font-semibold text-zinc-900 mb-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-zinc-900">
            ₹{product.price}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ₹{product.originalPrice}
          </span>
        </div>

        {/* Spacer pushes button down */}
        <div className="flex-grow"></div>

        {/* Add to Cart */}
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-zinc-900 text-white py-2.5 rounded-lg 
                     hover:bg-zinc-800 transition duration-300 cursor-pointer"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;
