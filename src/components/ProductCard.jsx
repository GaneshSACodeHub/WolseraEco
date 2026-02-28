import React from "react";

function ProductCard({ product, onAddToCart }) {

  const handleCardClick = () => {
    window.open(`/product/${product.id}`, "_blank");
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-md overflow-hidden 
                 flex flex-col justify-between 
                 h-[460px] 
                 cursor-pointer
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

        {/* Category / Gender Tag */}
        {product.category && (
          <span className="inline-block text-[10px] uppercase tracking-wider 
                           bg-zinc-100 text-zinc-800 px-2 py-1 rounded-full mb-2 w-fit">
            {product.category}
          </span>
        )}

        {/* Name */}
        <h3 className="text-base font-semibold text-zinc-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-zinc-900">
            ₹{product.price}
          </span>

          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        <div className="flex-grow"></div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-zinc-900 text-white py-2.5 rounded-lg 
                     hover:bg-zinc-800 transition duration-300"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;