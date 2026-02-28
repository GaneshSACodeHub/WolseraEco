import React from "react";
import AdminLayout from "../AdminLayout";
import ProductTable from "./ProductTable";
import { Link } from "react-router-dom";

function AdminProducts() {
  return (
    <AdminLayout>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900">
            Products
          </h2>
          <p className="text-gray-500 mt-1">
            Manage your products
          </p>
        </div>

        <Link
          to="/admin/products/create"
          className="bg-black text-white px-6 py-2 rounded-lg 
                     hover:bg-zinc-800 transition"
        >
          + Create Product
        </Link>
      </div>

      <ProductTable />

    </AdminLayout>
  );
}

export default AdminProducts;