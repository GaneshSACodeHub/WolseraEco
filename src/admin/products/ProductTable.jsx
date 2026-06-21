import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllProducts,
  activateProduct,
  deactivateProduct,
  deleteProduct
} from "../../Services/adminProductService.js";

function ProductTable() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data.content);
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id, active) => {
    try {
      if (active) {
        await deactivateProduct(id);
      } else {
        await activateProduct(id);
      }

      fetchProducts();
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      fetchProducts();
    } catch (err) {
      console.error("Error deleting product", err);
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return <div className="p-6">Loading products...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border">

      <table className="w-full text-left">

        <thead className="bg-zinc-100 text-sm uppercase tracking-wide text-gray-600">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Gender</th>
            <th className="p-4">Colour</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>

          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-500">
                No products found
              </td>
            </tr>
          ) : (

            products.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-zinc-50 transition"
              >
                <td className="p-4 font-medium text-zinc-900">
                  {product.name}
                </td>

                <td className="p-4 text-gray-600">
                  {product.gender}
                </td>

                <td className="p-4 text-gray-600">
                  {product.colour}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      product.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-4 flex gap-3">

                  <Link
                    to={`/admin/products/edit/${product.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => toggleActive(product.id, product.active)}
                    className="text-sm text-zinc-700 hover:underline"
                  >
                    {product.active ? "Deactivate" : "Activate"}
                  </button>

                </td>

              </tr>
            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default ProductTable;