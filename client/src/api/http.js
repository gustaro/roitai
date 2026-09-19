import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
})

export const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
})

export default http
