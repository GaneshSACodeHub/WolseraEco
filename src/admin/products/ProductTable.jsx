import React, { useState } from "react";
import { Link } from "react-router-dom";

function ProductTable() {

  // Temporary Static Data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Classic Black Jacket",
      gender: "Men",
      colour: "Black",
      active: true
    },
    {
      id: 2,
      name: "Minimal White Hoodie",
      gender: "Women",
      colour: "White",
      active: false
    }
  ]);

  const toggleActive = (id) => {
    setProducts(products.map(product =>
      product.id === id
        ? { ...product, active: !product.active }
        : product
    ));
  };

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

          {products.map((product) => (
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
                <span className={`px-3 py-1 rounded-full text-xs font-medium
                  ${product.active 
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}>
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
                  onClick={() => toggleActive(product.id)}
                  className="text-sm text-zinc-700 hover:underline"
                >
                  {product.active ? "Deactivate" : "Activate"}
                </button>

              </td>

            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}

export default ProductTable;