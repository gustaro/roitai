// rafce
import React, { useState, useEffect } from "react";
import { getListAllUsers, changeUserStatus, changeUserRole } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    const value = { id: userId, enabled: !userStatus };
    changeUserStatus(token, value)
      .then((res) => {
        handleGetUsers(token);
        toast.success("Update Status Success!!");
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserRole = (userId, userRole) => {
    const value = { id: userId, role: userRole };
    changeUserRole(token, value)
      .then((res) => {
        handleGetUsers(token);
        toast.success("Update Role Success!!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">User Management</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 text-gray-500 font-medium">{u.id}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{u.email}</td>
                  <td className="px-6 py-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleChangeUserRole(u.id, e.target.value)}
                      className={`appearance-none cursor-pointer outline-none font-bold text-xs rounded-full px-4 py-1.5 border-2 transition-all ${
                        u.role === 'admin'
                          ? 'border-indigo-100 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                          : 'border-emerald-100 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      <option value="user" className="text-gray-800 bg-white">User</option>
                      <option value="admin" className="text-gray-800 bg-white">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold text-xs rounded-full px-4 py-1.5 border-2 transition-all ${
                        u.enabled
                          ? 'border-green-100 bg-green-50 text-green-700'
                          : 'border-red-100 bg-red-50 text-red-700'
                      }`}>
                      {u.enabled ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 font-bold text-xs rounded-lg hover:bg-yellow-600 transition-all shadow-sm"
                      onClick={() => handleChangeUserStatus(u.id, u.enabled)}
                    >
                      {u.enabled ? "Disable" : "Enable"}
                    </button>
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

export default TableUsers;