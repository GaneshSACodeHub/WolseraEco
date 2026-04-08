import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  updateProduct,
  addVariant,
  deleteVariant,
  addImage,
  updateImage,
  deleteImage
} from "../../Services/adminProductService";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
  fetchProduct();
  }, [id]);

const fetchProduct = async () => {
  try {
    const res = await getProductById(id);

    const product = res.data;

    setFormData({
      name: product.name,
      description: product.description,
      gender: product.gender,
      colour: product.colour,
      active: product.active
    });

    setVariants(product.variants || []);
    setImages(product.images || []);

  } catch (err) {
    console.error("Error loading product", err);
  }
};

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    gender: "",
    colour: "",
    active: true
  });

  // ================= VARIANT STATE =================
  const [variants, setVariants] = useState([]);

  const [showVariantForm, setShowVariantForm] = useState(false);

  const [newVariant, setNewVariant] = useState({
    size: "",
    price: "",
    stockQuantity: "",
    sku: ""
  });

  // ================= IMAGE STATE =================
  const [images, setImages] = useState([]);

  const [showImageForm, setShowImageForm] = useState(false);

  const [newImage, setNewImage] = useState({
    imageUrl: "",
    primary: false
  });


  // ================= PRODUCT HANDLERS =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const payload = {
      ...formData,
      variants: [],
      images: []
    };

    await updateProduct(id, payload);

    alert("Product updated");
    navigate("/admin/products");

  } 
  catch (err) {
    console.error("Update failed", err);
    alert("Failed to update product");
  }
  };

  // ================= VARIANT HANDLERS =================
  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setNewVariant({ ...newVariant, [name]: value });
  };

  const handleAddVariant = async () => {

  if (!newVariant.size || !newVariant.price || !newVariant.stockQuantity || !newVariant.sku) return;

  try {

    const res = await addVariant(id, {
      size: newVariant.size,
      price: newVariant.price,
      stockQuantity: newVariant.stockQuantity,
      sku: newVariant.sku
    });

    setVariants([...variants, res.data]);

    setNewVariant({
      size: "",
      price: "",
      stockQuantity: "",
      sku: ""
    });

    setShowVariantForm(false);

  } catch (err) {
    console.error("Variant add failed", err);
  }
};

  const handleDeleteVariant = async (variantId) => {

  try {

    await deleteVariant(variantId);

    setVariants(variants.filter(v => v.id !== variantId));

  } catch (err) {
    console.error("Delete variant failed", err);
  }
};

  // ================= IMAGE HANDLERS =================
  const handleImageChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewImage({
      ...newImage,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleAddImage = async () => {

  if (!newImage.imageUrl) return;

  try {

    const res = await addImage(id, {
      imageUrl: newImage.imageUrl,
      primary: newImage.primary
    });

    setImages([...images, res.data]);

    setNewImage({
      imageUrl: "",
      primary: false
    });

    setShowImageForm(false);

  } catch (err) {
    console.error("Image upload failed", err);
  }
};

  const handleDeleteImage = async (imageId) => {

  try {

    await deleteImage(imageId);

    setImages(images.filter(img => img.id !== imageId));

  } catch (err) {
    console.error("Delete image failed", err);
  }
  };

  const handleSetPrimary = async (id) => {
    const updated = images.map(img => ({
      ...img,
      primary: img.id === id
    }));

    await updateImage(id);
    setImages(updated);

  };
  

return (
  <AdminLayout>

    <div className="max-w-6xl mx-auto px-6 py-10 space-y-14">

      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-3xl font-bold text-zinc-900">
          Edit Product
        </h2>
        <p className="text-gray-500 mt-1">
          Update product details
        </p>
      </div>

      {/* ================= PRODUCT FORM ================= */}
      <div className="bg-white shadow-sm rounded-xl p-8 border border-zinc-200">
        <form onSubmit={handleSubmit} className="space-y-6">

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

          <div className="grid md:grid-cols-2 gap-6">
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
          </div>

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

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-zinc-800 transition"
          >
            Update Product
          </button>

        </form>
      </div>

      {/* ================= VARIANT SECTION ================= */}
      <div className="bg-white shadow-sm rounded-xl p-8 border border-zinc-200">

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-zinc-900">
            Variants
          </h3>
          <button
            onClick={() => setShowVariantForm(!showVariantForm)}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
          >
            + Add Variant
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border border-zinc-200">
            <thead className="bg-zinc-100 text-sm uppercase tracking-wide text-gray-600">
              <tr>
                <th className="p-3">Size</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant) => (
                <tr key={variant.id} className="border-t border-zinc-200">
                  <td className="p-3">{variant.size}</td>
                  <td className="p-3">₹{variant.price}</td>
                  <td className="p-3">{variant.stockQuantity}</td>
                  <td className="p-3">{variant.sku}</td>
                  <td className="p-3">
                    <button
                      disabled={variants.length === 1}
                      onClick={() => handleDeleteVariant(variant.id)}
                      className={`px-3 py-1 rounded text-sm ${
                        variants.length === 1
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600 transition"
                      }`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showVariantForm && (
          <div className="mt-8 grid md:grid-cols-4 gap-4">
            <input type="text" name="size" placeholder="Size" value={newVariant.size} onChange={handleVariantChange} className="border border-zinc-300 p-3 rounded-lg" />
            <input type="number" name="price" placeholder="Price" value={newVariant.price} onChange={handleVariantChange} className="border border-zinc-300 p-3 rounded-lg" />
            <input type="number" name="stockQuantity" placeholder="Stock" value={newVariant.stock} onChange={handleVariantChange} className="border border-zinc-300 p-3 rounded-lg" />
            <input type="text" name="sku" placeholder="SKU" value={newVariant.sku} onChange={handleVariantChange} className="border border-zinc-300 p-3 rounded-lg" />

            <div className="md:col-span-4 flex gap-4 mt-4">
              <button onClick={handleAddVariant} className="bg-black text-white px-6 py-2 rounded-lg hover:bg-zinc-800 transition">
                Save Variant
              </button>
              <button onClick={() => setShowVariantForm(false)} className="bg-gray-300 px-6 py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= IMAGE SECTION ================= */}
      <div className="bg-white shadow-sm rounded-xl p-8 border border-zinc-200">

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-zinc-900">
            Images
          </h3>
          <button
            onClick={() => setShowImageForm(!showImageForm)}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
          >
            + Add Image
          </button>
        </div>
        {showImageForm && (
            <div className="mt-8 grid md:grid-cols-3 gap-4">

              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={newImage.imageUrl}
                onChange={handleImageChange}
                className="border border-zinc-300 p-3 rounded-lg"
              />

              

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="primary"
                  checked={newImage.primary}
                  onChange={handleImageChange}
                />
                Primary Image
              </label>

              <div className="md:col-span-3 flex gap-4 mt-4">
                <button
                  onClick={handleAddImage}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-zinc-800 transition"
                >
                  Save Image
                </button>

                <button
                  onClick={() => setShowImageForm(false)}
                  className="bg-gray-300 px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>

            </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div key={img.id} className="relative border border-zinc-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              {img.primary && (
                <span className="absolute top-2 left-2 bg-black text-white text-xs px-3 py-1 rounded-full z-10">
                  PRIMARY
                </span>
              )}
              <img src={img.imageUrl} alt="Product" className="w-full h-64 object-cover" />
              <div className="p-4 flex justify-between items-center">
                {!img.primary && (
                  <button
                    onClick={() => handleSetPrimary(img.id)}
                    className="text-sm border border-black px-3 py-1 rounded-lg hover:bg-black hover:text-white transition"
                  >
                    Set Primary
                  </button>
                )}
                <button
                  onClick={() => handleDeleteImage(img.id)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>

  </AdminLayout>
);
}

export default EditProduct;