import React, { useState } from 'react';
import { FaBars, FaUser, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from React Router

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r bg-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src='' 
            alt="Logo" 
            className="h-12 w-12 mr-3"
          />
          <FaBars onClick={toggleMenu} className="cursor-pointer md:hidden text-black" />
        </div>

        <div className="hidden md:flex space-x-8 text-lg font-semibold">
          
          <Link to='/' className='text-black hover:text-indigo-200 transition-colors duration-300'>
            Home
          </Link>
          <Link to='/petslist' className='text-black hover:text-indigo-200 transition-colors duration-300'>
            Pets
          </Link>
          <Link to='/adoption' className='text-black hover:text-indigo-200 transition-colors duration-300'>
            Manage Adoption
          </Link>
          
          
          <Link to="/profile" className="text-black hover:text-indigo-200 transition-colors duration-300">
            Profile
          </Link>
        </div>

        <div className="text-2xl text-black">
          <Link to="/profile">
            <FaUser className="hover:text-indigo-200 cursor-pointer transition-colors duration-300" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden rounded-r-lg`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <FaTimes onClick={toggleMenu} className="text-gray-800 cursor-pointer" />
        </div>
        <div className="p-4 space-y-4">
          <Link to='/' className='block py-2 px-4 text-gray-800 font-medium hover:bg-gray-100 rounded-md transition-colors duration-300'>
            Home
          </Link>
          <Link to='/petslist' className='block py-2 px-4 text-gray-800 font-medium hover:bg-gray-100 rounded-md transition-colors duration-300'>
            Pets
          </Link>
          
          
          <Link to='/adoption' className='block py-2 px-4 text-gray-800 font-medium hover:bg-gray-100 rounded-md transition-colors duration-300'>
            Manage Adoption
          </Link>
          
          {/* Add Profile Link in Mobile Menu */}
          <Link to="/profile" className="block py-2 px-4 text-gray-800 font-medium hover:bg-gray-100 rounded-md transition-colors duration-300">
            Profile
          </Link>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
}
