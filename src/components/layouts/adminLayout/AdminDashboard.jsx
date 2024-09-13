import React from 'react';
import AdminSidebar from './Sidebar';
import AdminTopBar from './TopBar';
import { Outlet } from 'react-router-dom';
const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <AdminTopBar />
        
        {/* Sidebar and Content Wrapper */}
        <div className="flex mt-16">
          {/* Sidebar */}
          <div className="md:w-64">
            <AdminSidebar />
          </div>

          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
