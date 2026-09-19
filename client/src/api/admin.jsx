import http, { authHeader } from './http'

export const getOrdersAdmin = (token) => http.get('/admin/orders', authHeader(token))
export const changeOrderStatus = (token, orderId, orderStatus) =>
  http.put('/admin/order-status', { orderId, orderStatus }, authHeader(token))
export const getListAllUsers = (token) => http.get('/users', authHeader(token))
export const changeUserStatus = (token, value) => http.post('/change-status', value, authHeader(token))
export const changeUserRole = (token, value) => http.post('/change-role', value, authHeader(token))
