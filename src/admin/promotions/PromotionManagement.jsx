import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";

import {
  getPromotions,
  createPromotion,
  getAvailableProducts,
  getPromotion,
  updatePromotion,
  deletePromotion
} from "../../Services/promotionService";

function PromotionManagement() {

  const [promotions, setPromotions] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [availableProducts, setAvailableProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    type: "NEW_ARRIVAL",
    discountPercentage: "",
    productIds: []
  });

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    try {

      const data =
        await getPromotions();

      setPromotions(data);

    } catch (error) {

      console.error(error);

      alert("Failed to load promotions");
    }
  };

  const loadAvailableProducts = async () => {

    try {

      const data =
        await getAvailableProducts();

      setAvailableProducts(data);

    } catch (error) {

      console.error(error);

      alert("Failed to load products");
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProductSelect = (productId) => {

    const exists =
      formData.productIds.includes(productId);

    if (exists) {

      setFormData({
        ...formData,
        productIds:
          formData.productIds.filter(
            id => id !== productId
          )
      });

    } else {

      setFormData({
        ...formData,
        productIds: [
          ...formData.productIds,
          productId
        ]
      });
    }
  };

    const handleSavePromotion = async (e) => {

    e.preventDefault();

    try {

        const payload = {

        name: formData.name,

        type: formData.type,

        discountPercentage:
            formData.type === "DISCOUNT"
            ? Number(formData.discountPercentage)
            : null,

        productIds: formData.productIds
        };

        if (editingId) {

        await updatePromotion(
            editingId,
            payload
        );

        alert("Promotion updated successfully");

        } else {

        await createPromotion(
            payload
        );

        alert("Promotion created successfully");
        }

        setShowForm(false);

        setEditingId(null);

        setFormData({
        name: "",
        type: "NEW_ARRIVAL",
        discountPercentage: "",
        productIds: []
        });

        loadPromotions();

    } catch (error) {

        console.error(error);

        alert("Save failed");
    }
    };

    const handleEdit = async (id) => {

    try {

        const promotion =
        await getPromotion(id);

        await loadAvailableProducts();

        setEditingId(id);

        setFormData({

        name: promotion.name,

        type: promotion.type,

        discountPercentage:
            promotion.discountPercentage || "",

        productIds:
            promotion.products.map(
            product => product.id
            )
        });

        setShowForm(true);

    } catch (error) {

        console.error(error);

        alert("Failed to load promotion");
    }
    };

    const handleDelete = async (id) => {

    const confirmed =
        window.confirm(
        "Delete this promotion?"
        );

    if (!confirmed) {
        return;
    }

    try {

        await deletePromotion(id);

        alert("Promotion deleted successfully");

        loadPromotions();

    } catch (error) {

        console.error(error);

        alert("Delete failed");
    }
    };

  return (
    <AdminLayout>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-bold text-zinc-900">
            Promotions
          </h2>

          <p className="text-gray-500 mt-1">
            Manage your promotions
          </p>

        </div>

        <button
        onClick={() => {

            setEditingId(null);

            setFormData({
            name: "",
            type: "NEW_ARRIVAL",
            discountPercentage: "",
            productIds: []
            });

            setShowForm(true);

            loadAvailableProducts();
        }}
        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-zinc-800 transition"
        >
        + Create Promotion
        </button>

      </div>

      {/* Create Promotion Form */}
      {showForm && (

        <form
          onSubmit={handleSavePromotion}
          className="bg-white rounded-xl shadow p-6 mb-8"
        >

          <div className="grid gap-4">

            <input
              type="text"
              name="name"
              placeholder="Promotion Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >

              <option value="NEW_ARRIVAL">
                NEW ARRIVAL
              </option>

              <option value="DISCOUNT">
                DISCOUNT
              </option>

            </select>

            {formData.type === "DISCOUNT" && (

              <input
                type="number"
                name="discountPercentage"
                placeholder="Discount Percentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                className="border p-3 rounded-lg"
                required
              />

            )}

            <div>

              <h4 className="font-semibold mb-2">
                Select Products
              </h4>

              <div className="border rounded-lg p-3 max-h-60 overflow-y-auto">

                {availableProducts.map((product) => (

                  <label
                    key={product.id}
                    className="block mb-2"
                  >

                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={
                        formData.productIds.includes(
                          product.id
                        )
                      }
                      onChange={() =>
                        handleProductSelect(
                          product.id
                        )
                      }
                    />

                    {product.name}

                  </label>

                ))}

              </div>

            </div>

            <div className="flex gap-3">

                <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                {editingId
                    ? "Update Promotion"
                    : "Save Promotion"}
                </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg"
              >
                Cancel
              </button>

            </div>

          </div>

        </form>

      )}

      {/* Promotion List */}
      <div className="space-y-4">

        {promotions.map((promotion) => (

          <div
            key={promotion.id}
            className="bg-white rounded-xl shadow p-5"
          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-lg font-semibold">
                  {promotion.name}
                </h3>

                <p className="text-gray-600">
                  Type: {promotion.type}
                </p>

                {promotion.type === "DISCOUNT" && (

                  <p className="text-red-600 font-medium">
                    {promotion.discountPercentage}% OFF
                  </p>

                )}

                <p className="text-sm text-gray-500">
                  Products: {promotion.productCount}
                </p>

              </div>

              <div className="flex gap-2">

                <button
                onClick={() =>
                    handleEdit(
                    promotion.id
                    )
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                Edit
                </button>

                <button
                onClick={() =>
                    handleDelete(
                    promotion.id
                    )
                }
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </AdminLayout>
  );
}

export default PromotionManagement;