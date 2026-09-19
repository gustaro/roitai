import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const getOrdersAdmin = async (token) => {
  return axios.get(`${API_URL}/admin/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeOrderStatus = async (token, orderId, orderStatus) => {
  return axios.put(
    `${API_URL}/admin/order-status`,
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getListAllUsers = async (token) => {
  return axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserStatus = async (token, value) => {
  return axios.post(`${API_URL}/change-status`, value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeUserRole = async (token, value) => {
  return axios.post(`${API_URL}/change-role`, value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const currentUser = async (token) => {
  return axios.post(`${API_URL}/current-user`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const currentAdmin = async (token) => {
  return axios.post(`${API_URL}/current-admin`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};