import React from 'react';

const AdminTopBar = () => {
  return (
    <div className="fixed w-full bg-white shadow-md z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <div className="flex items-center space-x-4">
          <a href="/notifications" className="text-gray-600 hover:text-gray-900">Notifications</a>
          <a href="/profile" className="text-gray-600 hover:text-gray-900">Profile</a>
        </div>
      </div>
    </div>
  );
};

export default AdminTopBar;
