import axiosInstance from "./api";

const API_URL = "/admin/products";
// ================= PRODUCTS =================

export const getAllProducts = (page = 0, size = 20) => {
  return axiosInstance.get(`${API_URL}?page=${page}&size=${size}`);
};

export const getProductById = (id) => {
  return axiosInstance.get(`${API_URL}/${id}`);
};

export const createProduct = (data) =>
  axiosInstance.post(`${API_URL}/create-product`, data);

export const updateProduct = (id, data) =>
  axiosInstance.put(`${API_URL}/${id}`, data);

export const activateProduct = (id) =>
  axiosInstance.patch(`${API_URL}/${id}/activate`);

export const deactivateProduct = (id) =>
  axiosInstance.patch(`${API_URL}/${id}/deactivate`);

// ================= VARIANTS =================

export const addVariant = (productId, data) =>
  axiosInstance.post(`${API_URL}/${productId}/variants`, data);

export const updateVariant = (variantId, data) =>
  axiosInstance.put(`${API_URL}/variants/${variantId}`, data);

export const deleteVariant = (variantId) =>
  axiosInstance.delete(`${API_URL}/variants/${variantId}`);

// ================= IMAGES =================

export const addImage = (productId, data) =>
  axiosInstance.post(`${API_URL}/${productId}/images`, data);

export const updateImage = async (imageId) =>{
  return await axiosInstance.patch(`${API_URL}/images/${imageId}/set-primary`); 
}

export const deleteImage = (imageId) =>
  axiosInstance.delete(`${API_URL}/images/${imageId}`);

// ================= CATEGORIES =================

export const fetchCategoryTree = async () => {
  const response = await axiosInstance.get(`${API_URL}/categories/tree`);
  return response.data;
};

export const createCategory = (data) => {
  return axiosInstance.post(`${API_URL}/categories/create-category`, data);
};

export const deleteCategory = (id) => {
  return axiosInstance.delete(`${API_URL}/categories/delete/${id}`);
};

export const updateCategoryName = (id, name) => {
  return axiosInstance.put(`${API_URL}/categories/change-name/${id}`, null, {
    params: { name }
  });
};