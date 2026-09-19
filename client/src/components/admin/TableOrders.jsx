// rafce
import React, { useEffect, useState } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        toast.success("Update Status Success!!!");
        handleGetOrder(token);
      })
      .catch((err) => console.log(err));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-100 text-gray-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Order Management</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">No.</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Products</th>
                <th className="px-6 py-4 text-right">Total</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Manage</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {orders?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 text-center text-gray-500 font-medium">{index + 1}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800">{item.orderedBy.email}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.orderedBy.address}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {dateFormat(item.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <ul className="space-y-1">
                      {item.products?.map((product, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                          <span className="font-medium mr-2">{product.product.title}</span>
                          <span className="text-gray-400 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                            {product.count} x {numberFormat(product.product.price)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-emerald-600">
                    ฿{numberFormat(item.cartTotal)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${getStatusColor(item.orderStatus)}`}>
                      {item.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={item.orderStatus}
                      onChange={(e) => handleChangeOrderStatus(token, item.id, e.target.value)}
                      className="cursor-pointer bg-white border-2 border-gray-200 text-gray-700 text-xs font-bold rounded-xl px-3 py-2 outline-none hover:border-gray-300 transition-all focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="Not Process">Not Process</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableOrders;