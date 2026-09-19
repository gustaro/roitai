import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const createProduct = async (token, form) => {
  return axios.post(`${API_URL}/product`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (count = 20) => {
  return axios.get(`${API_URL}/products/${count}`);
};

export const readProduct = async (token, id) => {
  return axios.get(`${API_URL}/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = async (token, id) => {
  return axios.delete(`${API_URL}/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = async (token, id, form) => {
  return axios.put(`${API_URL}/product/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = async (token, form) => {
  return axios.post(
    `${API_URL}/images`,
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFiles = async (token, public_id) => {
  return axios.post(
    `${API_URL}/removeimages`,
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const searchFilters = async (arg) => {
  return axios.post(`${API_URL}/search/filters`, arg);
};

export const listProductBy = async (sort, order, limit) => {
  return axios.post(`${API_URL}/productby`, {
    sort,
    order,
    limit,
  });
};