import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';  // Import icons from react-icons
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Off-Canvas Trigger Button with Icon */}
      <div className="md:hidden p-4">
        <button 
          className="text-white bg-blue-500 px-4 py-2 rounded" 
          onClick={toggleSidebar}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}  {/* Toggle between open and close icon */}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed md:static md:w-64 bg-gray-800 h-full transition-all duration-300 ${isOpen ? 'left-0' : '-left-64'}`}>
        <div className="p-4 text-white font-bold text-lg">
          Admin Dashboard
        </div>
        <div className="p-4 space-y-4 text-white">
          <Link to="/dashboard" className="hover:bg-gray-700 block px-4 py-2 rounded">Dashboard</Link>
          <Link to="/admin/dashboard/users" className="hover:bg-gray-700 block px-4 py-2 rounded">Users</Link>
          <Link to="/services" className="hover:bg-gray-700 block px-4 py-2 rounded">Services</Link>
          <Link to="/settings" className="hover:bg-gray-700 block px-4 py-2 rounded">Settings</Link>
        </div>
      </div>

      {/* Overlay for off-canvas */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>}
    </>
  );
};

export default AdminSidebar;
