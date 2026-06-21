import React from "react";

function ProductCard({ product, onAddToCart }) {

  const handleCardClick = () => {
    window.open(`/product/${product.id}`, "_blank");
  };

  const handleViewProduct = (e) => {
    e.stopPropagation();
    window.open(`/product/${product.id}`, "_blank");
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-md overflow-hidden
                 flex flex-col justify-between
                 h-[500px]
                 cursor-pointer
                 transition duration-300
                 hover:-translate-y-2 hover:shadow-2xl
                 hover:shadow-purple-500/10
                 group"
    >

      {/* Image Section */}
      <div className="overflow-hidden h-[280px] relative">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover
                     transition duration-500 group-hover:scale-110"
        />

        {/* Category Badge */}
        {product.category && (
          <span
            className="absolute top-3 left-3
            text-[10px] uppercase tracking-wider
            bg-white/90 backdrop-blur-sm
            text-zinc-900 px-3 py-1 rounded-full font-medium shadow"
          >
            {product.category}
          </span>
        )}

        {/* New Arrival Badge */}
        {product.promotionType === "NEW_ARRIVAL" && (
          <span
            className="
              absolute top-3 left-3
              bg-emerald-500
              text-white
              text-[10px]
              font-bold
              px-3 py-1
              rounded-full
              shadow-lg
              uppercase
              tracking-wide
            "
          >
            New Arrival
          </span>
        )}

        {/* Discount Badge */}
        {product.promotionType === "DISCOUNT" &&
          product.discountPercentage && (
            <span
              className="
                absolute top-3 left-3
                bg-red-500
                text-white
                text-[10px]
                font-bold
                px-3 py-1
                rounded-full
                shadow-lg
                uppercase
                tracking-wide
              "
            >
              {product.discountPercentage}% OFF
            </span>
        )}

      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">

          <span className="text-yellow-500 text-sm">
            ★
          </span>

          <span className="text-sm font-semibold text-zinc-800">
            {product.averageRating?.toFixed(1) || "0.0"}
          </span>

          <span className="text-xs text-gray-500">
            ({product.totalRatings || 0})
          </span>

        </div>

        {/* Name */}
        <h3 className="text-base font-semibold text-zinc-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Gender + Colour */}
        <p className="text-sm text-gray-500 mb-4">
          {product.gender || "Unisex"} • {product.colour || "Classic"}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">

          <span className="text-xl font-bold text-zinc-900">
            ₹{product.price}
          </span>

          {product.originalPrice && (
            <>
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>

              {product.discountPercentage && (
                <span
                  className="
                    bg-red-100
                    text-red-600
                    text-xs
                    font-semibold
                    px-2 py-1
                    rounded-full
                  "
                >
                  {product.discountPercentage}% OFF
                </span>
              )}
            </>
          )}

        </div>

        <div className="flex-grow"></div>

        {/* View Product */}
          <button
            onClick={handleViewProduct}
            className="w-full bg-[#9257c3]
                      text-white py-3 rounded-xl font-medium
                      hover:bg-[#7d46af]
                      hover:shadow-lg hover:shadow-[#9257c3]/30
                      active:scale-[0.98]
                      transition duration-300"
          >
            View Product
          </button>

      </div>

    </div>
  );
}

export default ProductCard;