import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const createCategory = async (token, form) => {
    return axios.post(`${API_URL}/category`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listCategory = async () => {
    return axios.get(`${API_URL}/category`)
}

export const removeCategory = async (token, id) => {
    return axios.delete(`${API_URL}/category/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}