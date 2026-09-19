import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const createUserCart = async (token, cart) => {
  return axios.post(`${API_URL}/user/cart`, cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listUserCart = async (token) => {
  return axios.get(`${API_URL}/user/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveAddress = async (token, address) => {
  return axios.post(
    `${API_URL}/user/address`,
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const saveOrder = async (token, payload) => {
  return axios.post(`${API_URL}/user/order`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrders = async (token) => {
  return axios.get(`${API_URL}/user/order`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};