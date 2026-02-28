import React from "react";
import ProductCard from "./ProductCard";

function ProductSection() {

  const products = [
    {
      id: 1,
      name: "Classic Black Jacket",
      category: "Men",
      price: 1999,
      originalPrice: 2999,
      image: "https://picsum.photos/600/800?random=1"
    },
    {
      id: 2,
      name: "Minimal White Hoodie",
      category: "Women",
      price: 1499,
      originalPrice: 2499,
      image: "https://picsum.photos/600/800?random=2"
    },
    {
      id: 3,
      name: "Urban Street T-Shirt",
      category: "Men",
      price: 899,
      originalPrice: 1599,
      image: "https://picsum.photos/600/800?random=3"
    },
    {
      id: 4,
      name: "Elegant Summer Dress",
      category: "Women",
      price: 1799,
      originalPrice: 2699,
      image: "https://picsum.photos/600/800?random=4"
    },
    {
      id: 5,
      name: "Premium Denim Jacket",
      category: "Men",
      price: 2499,
      originalPrice: 3499,
      image: "https://picsum.photos/600/800?random=5"
    },
    {
      id: 6,
      name: "Luxury Knit Sweater",
      category: "Women",
      price: 1899,
      originalPrice: 2899,
      image: "https://picsum.photos/600/800?random=6"
    },
    {
      id: 7,
      name: "Slim Fit Formal Shirt",
      category: "Men",
      price: 1299,
      originalPrice: 1999,
      image: "https://picsum.photos/600/800?random=7"
    },
    {
      id: 8,
      name: "Modern Casual Blazer",
      category: "Men",
      price: 2999,
      originalPrice: 3999,
      image: "https://picsum.photos/600/800?random=8"
    }
  ];

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  return (
    <section className="bg-zinc-950 py-20 px-4 md:px-8">

      {/* Title */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[0.3em]">
          WOLSERA COLLECTION
        </h2>
        <div className="w-24 h-[2px] bg-white mx-auto mt-4"></div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto grid 
                      grid-cols-1 
                      sm:grid-cols-2 
                      lg:grid-cols-4 
                      gap-10">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}

      </div>

      {/* Pagination (Backend Ready UI) */}
      <div className="flex justify-center mt-16 gap-3">
        <button className="px-4 py-2 bg-zinc-800 text-white rounded-lg">
          1
        </button>
        <button className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition">
          2
        </button>
        <button className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition">
          3
        </button>
      </div>

    </section>
  );
}

export default ProductSection;