import axiosInstance from "./api";

const API_BASE = "http://localhost:8080/api/admin/promotions";

export const getPromotions = async () => {
  const response = await axiosInstance.get(API_BASE);
  return response.data;
};

export const getPromotion = async (id) => {
  const response = await axiosInstance.get(`${API_BASE}/${id}`);
  return response.data;
};

export const createPromotion = async (data) => {
  const response = await axiosInstance.post(API_BASE , data);
  return response.data;
};

export const updatePromotion = async (id,data) => {
  const response = await axiosInstance.put(`${API_BASE}/${id}`, data);
  return response.data;
};

export const deletePromotion = async (id) => {
  return axiosInstance.delete(`${API_BASE}/${id}`);
};

export const getAvailableProducts = async () => {
  const response = await axiosInstance.get(`${API_BASE}/available-products`);
  return response.data;
};