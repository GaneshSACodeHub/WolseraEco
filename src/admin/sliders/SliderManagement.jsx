import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";

import {
  fetchSliders,
  createSlider,
  updateSlider,
  deleteSlider,
  fetchPromotions
} from "../../Services/sliderService";

function SliderManagement() {

  const [sliders, setSliders] = useState([]);
  const [promotions, setPromotions] = useState([]);

const [formData, setFormData] = useState({
  imageUrl: "",
  title: "",
  subtitle: "",
  buttonText: "",
  promotionId: ""
});

  const [editingId, setEditingId] = useState(null);

useEffect(() => {
  loadSliders();
  loadPromotions();
}, []);

  const loadSliders = async () => {
    try {
      const data = await fetchSliders();
      setSliders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadPromotions = async () => {
    try {
      const data = await fetchPromotions();
      setPromotions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
  setFormData({
    imageUrl: "",
    title: "",
    subtitle: "",
    buttonText: "",
    promotionId: ""
  });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        await updateSlider(
          editingId,
          formData
        );

        alert("Slider updated successfully");

      } else {

        await createSlider(formData);

        alert("Slider created successfully");
      }

      resetForm();
      loadSliders();

    } catch (err) {
      console.error(err);
      alert("Operation failed");
    }
  };

  const handleEdit = (slider) => {

    setEditingId(slider.id);

    setFormData({
      imageUrl: slider.imageUrl || "",
      title: slider.title || "",
      subtitle: slider.subtitle || "",
      buttonText: slider.buttonText || "",
      promotionId: slider.promotionId || ""
    });
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this slider?")) {
      return;
    }

    try {

      await deleteSlider(id);

      alert("Slider deleted");

      loadSliders();

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout>
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Slider Management
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-10"
      >

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="subtitle"
            placeholder="Subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="buttonText"
            placeholder="Button Text"
            value={formData.buttonText}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="promotionId"
            value={formData.promotionId}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >

            <option value="">
              Select Promotion
            </option>

            {promotions.map((promotion) => (

              <option
                key={promotion.id}
                value={promotion.id}
              >
                {promotion.name}
                {" - "}
                {promotion.type}
              </option>

            ))}

          </select>

        </div>

        <div className="flex gap-3 mt-6">

          <button
            type="submit"
            className="bg-[#9257c3] text-white px-6 py-2 rounded-lg"
          >
            {editingId
              ? "Update Slider"
              : "Create Slider"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
          )}

        </div>

      </form>

      {/* Slider List */}
      <div className="grid gap-4">

        {sliders.map((slider) => (

          <div
            key={slider.id}
            className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
          >

            <div>

              <h2 className="font-bold text-lg">
                {slider.title}
              </h2>

              <p className="text-gray-600">
                {slider.subtitle}
              </p>

              {slider.promotionName && (

                <p className="text-sm text-[#9257c3] font-medium">

                  Promotion:
                  {" "}
                  {slider.promotionName}

                  {" ("}
                  {slider.promotionType}
                  {")"}

                </p>

              )}

            </div>

            <div className="flex gap-3">

              <button
                onClick={() => handleEdit(slider)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(slider.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

    </AdminLayout>
  );
}

export default SliderManagement;