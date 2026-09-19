import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import HeaderAdmin from "../components/admin/HeaderAdmin";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <SidebarAdmin />
      <div className="flex flex-col flex-1">
        <HeaderAdmin />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;