import React, { useState } from "react";
import AdminLayout from "../AdminLayout";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    gender: "",
    colour: "",
    active: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Product Created:", formData);

    // Later: Connect to backend
    navigate("/admin/products");
  };

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

      {/* Form Container */}
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

          {/* Submit Button */}
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