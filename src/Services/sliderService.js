import axiosInstance from "./api";

const API_BASE = "http://localhost:8080/api";

export const fetchSliders = async () => {
  const response = await axiosInstance.get(
    `${API_BASE}/products/sliders`
  );

  return response.data;
};

export const createSlider = async (sliderData) => {
  const response = await axiosInstance.post(
    `${API_BASE}/admin/products/slider/create`,
    sliderData
  );

  return response.data;
};

export const updateSlider = async (id, sliderData) => {
  const response = await axiosInstance.put(
    `${API_BASE}/admin/products/slider/update/${id}`,
    sliderData
  );

  return response.data;
};

export const deleteSlider = async (id) => {
  await axiosInstance.delete(
    `${API_BASE}/admin/products/slider/delete/${id}`
  );
};

export const fetchPromotions = async () => {
  const response = await axiosInstance.get(
    `${API_BASE}/admin/promotions`
  );

  return response.data;
};