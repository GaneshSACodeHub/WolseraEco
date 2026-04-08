import { useEffect, useState } from "react";
import { fetchProducts, searchProducts } from "../Services/productService";
import ProductCard from "./ProductCard";
import { ShoppingBag } from "lucide-react";

function ProductSection({ searchTerm }) {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadProducts(page);
  }, [page, searchTerm]);

  const loadProducts = async (pageNumber) => {
  try {

    let res;

    if (searchTerm && searchTerm.trim()) {
      res = await searchProducts({ search: searchTerm }, pageNumber, 8);
    } else {
      res = await fetchProducts(pageNumber, 8);
    }

    setProducts(res.content);
    setTotalPages(res.totalPages);

  } catch (err) {
    console.error("Failed to load products", err);
  }
};

  const handleAddToCart = (product) => {
    console.log("Add to cart clicked", product);
  };

  console.log(products);
  return (
    <section className="bg-zinc-950 py-20 px-4 md:px-8">

      
      {/* Title */}
      <div className="text-center mb-14">

        <div className="flex items-center justify-center gap-4">
          <ShoppingBag 
            className="text-[#9257c3] drop-shadow-[0_0_8px_#9257c3]" 
            size={28} 
          />
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[0.3em]">
            WOLSERA COLLECTION
          </h2>
        </div>

        <div className="w-50 h-[2px] bg-[#9257c3] mx-auto mt-4"></div>

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
            product={{
              id: product.id,
              name: product.name,
              image: product.thumbnailUrl,
              price: product.minPrice
            }}
            onAddToCart={handleAddToCart}
          />
        ))}

      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-16 gap-3">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-4 py-2 rounded-lg text-white
              ${page === i ? "bg-zinc-800" : "bg-zinc-700 hover:bg-zinc-600"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </section>
  );
}

export default ProductSection;