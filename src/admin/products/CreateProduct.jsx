import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../AdminLayout.jsx";
import { createProduct, fetchCategoryTree } from "../../Services/adminProductService.js";

function CreateProduct() {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    gender: "",
    colour: "",
    active: true,
    categories: []
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategoryTree();
        setCategories(data);
        
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    loadCategories();
  }, []);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleCategoryChange = (e) => {

    const selectedOptions = Array.from(e.target.selectedOptions).map(
      option => option.value
    );

    setFormData({
      ...formData,
      categories: selectedOptions
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.categories.length === 0) {
      alert("Please select at least one category");
      return;
    }

    const payload = {
      ...formData,
      variants: [],
      images: []
    };

    try {

      await createProduct(payload);

      navigate("/admin/products");

    } catch (err) {

      console.error("Error creating product", err);
      alert("Failed to create product");

    }
  };

  const getLeafCategories = (categories) => {
    const leaf = [];

    const traverse = (nodes) => {
      nodes.forEach((node) => {
        if (!node.children || node.children.length === 0) {
          leaf.push(node);
        } else {
          traverse(node.children);
        }
      });
    };

    traverse(categories);
    return leaf;
  };
  const leafCategories = getLeafCategories(categories);

  return (
    <AdminLayout>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-zinc-900">
            Create Product
          </h2>
          <p className="text-gray-500 mt-1">
            Add a new product to Wolsera
          </p>
        </div>

        {/* Form */}
        <div className="bg-white shadow-sm rounded-xl border border-zinc-200 p-8">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-zinc-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>

              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border border-zinc-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full border border-zinc-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select Gender</option>
                <option value="MEN">Men</option>
                <option value="WOMEN">Women</option>
                <option value="UNISEX">Unisex</option>
              </select>
            </div>

            {/* Colour */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Colour
              </label>

              <input
                type="text"
                name="colour"
                value={formData.colour}
                onChange={handleChange}
                required
                className="w-full border border-zinc-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Categories Multi Select */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Categories
              </label>

              <select 
                multiple
                value={formData.categories}
                onChange={handleCategoryChange}
                className="w-full border border-zinc-300 rounded-lg p-3 h-40 focus:outline-none focus:ring-2 focus:ring-black"
              >

                {leafCategories
                  .map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                ))}

              </select>

              <p className="text-xs text-gray-500 mt-1">
                Hold Ctrl (Windows) or Cmd (Mac) to select multiple categories
              </p>

            </div>

            {/* Active Toggle */}
            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="w-5 h-5"
              />

              <label className="text-sm font-medium">
                Active Product
              </label>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-zinc-800 transition"
            >
              Create Product
            </button>

          </form>

        </div>

      </div>

    </AdminLayout>
  );
}

export default CreateProduct;