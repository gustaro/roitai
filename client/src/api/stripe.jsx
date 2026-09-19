import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const payment = async (token) => 
    await axios.post(`${API_URL}/user/create-payment-intent`, {}, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})