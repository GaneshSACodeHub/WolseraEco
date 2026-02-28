import React from "react";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 bg-white p-10 overflow-y-auto">
        {children}
      </div>

    </div>
  );
}

export default AdminLayout;