import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchCategoryTree } from "../Services/productService";
import { ChevronDown } from "lucide-react";

function CategoryFilter() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategoryTree();

      const allChildren = data.flatMap(
        (parent) => parent.children || []
      );

      setCategories(allChildren);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const selectedCategory =
    categories.find(
      (cat) => String(cat.id) === String(categoryId)
    )?.name || "All Products";

  return (
    <div className="flex justify-center mb-10">

      <div className="relative">

        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="
            flex items-center gap-2
            px-5 py-3
            min-w-[260px]
            justify-between
            bg-zinc-900
            border border-zinc-700
            rounded-xl
            text-white
            hover:border-[#9257c3]
            transition-all
          "
        >
          <span>{selectedCategory}</span>

          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {dropdownOpen && (
          <div
            className="
                absolute left-0 mt-2
                w-full
                max-h-[300px]
                overflow-y-auto
                bg-black/90
                backdrop-blur-xl
                border border-purple-500/20
                rounded-xl
                shadow-[0_0_25px_rgba(146,87,195,0.25)]
                z-50
            "
          >

            <button
              className="
                w-full
                text-left
                px-4 py-3
                text-white
                hover:bg-[#9257c3]
                transition-all
              "
              onClick={() => {
                setDropdownOpen(false);
                navigate("/home");
              }}
            >
              All Products
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                className="
                  w-full
                  text-left
                  px-4 py-3
                  text-white
                  hover:bg-[#9257c3]
                  transition-all
                "
                onClick={() => {
                  setDropdownOpen(false);
                  navigate(`/home?categoryId=${category.id}`);
                }}
              >
                {category.name}
              </button>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default CategoryFilter;