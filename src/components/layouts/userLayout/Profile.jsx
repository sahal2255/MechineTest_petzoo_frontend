import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import { ProfileGet } from '../../../services/user/Profile';
import { useNavigate } from 'react-router-dom'; // For navigating after logout

export default function Profile() {
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
  });

  const navigate = useNavigate();

  // Fetch user profile details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await ProfileGet(); // Call the API function
        setUserData({
          userName: response.data.userName, // Use actual field names from your backend
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
        });
      } catch (err) {
        console.error('Error fetching profile data:', err);
      }
    };

    fetchProfile();
  }, []);

  // Logout handler
  const handleLogout = () => {
    // Clear tokens or session (implementation depends on your auth setup)
    document.cookie = 'token=; Max-Age=0'; // Clearing the token
    navigate('/login'); // Redirect to login after logout
  };

  console.log('Profile page loaded');

  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Profile section, centered and spaced below the navbar */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-gray-100">
        {/* Profile Card */}
        <div className="max-w-lg w-full mx-auto p-10 rounded-2xl shadow-2xl border border-gray-300 bg-white mb-10">
          <div className="relative flex flex-col items-center">
            <h2 className="text-xl font-extrabold text-gray-800 mt-6 mb-2">{userData.userName}</h2>
            <p className="text-gray-600 text-xl">{userData.email}</p>
            <p className="text-gray-600 text-xl">{userData.phoneNumber}</p>
          </div>

          {/* Logout Button */}
          <button 
            onClick={handleLogout} 
            className="mt-6 bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Pet Adoption Section */}
        <div className="max-w-lg w-full mx-auto p-10 rounded-2xl shadow-2xl border border-gray-300 bg-white mb-10">
          <h3 className="text-2xl font-extrabold text-gray-800 mb-6">Your Adopted Pets</h3>
          <div className="space-y-4">
            {/* Example of Adopted Pets Section */}
            <div className="flex justify-between items-center border-b pb-4">
              <p className="text-gray-700 font-semibold">Fluffy</p>
              <p className="text-gray-600">Adopted on: 2023-05-12</p>
            </div>
            <div className="flex justify-between items-center border-b pb-4">
              <p className="text-gray-700 font-semibold">Max</p>
              <p className="text-gray-600">Adopted on: 2022-11-20</p>
            </div>
            {/* Add more pets dynamically here */}
          </div>
        </div>

        {/* Saved Pets Section */}
        <div className="max-w-lg w-full mx-auto p-10 rounded-2xl shadow-2xl border border-gray-300 bg-white">
          <h3 className="text-2xl font-extrabold text-gray-800 mb-6">Saved Pets</h3>
          <div className="space-y-4">
            {/* Example of Saved Pets Section */}
            <div className="flex justify-between items-center border-b pb-4">
              <p className="text-gray-700 font-semibold">Bella</p>
              <button className="text-blue-500 hover:underline">View Details</button>
            </div>
            <div className="flex justify-between items-center border-b pb-4">
              <p className="text-gray-700 font-semibold">Shadow</p>
              <button className="text-blue-500 hover:underline">View Details</button>
            </div>
            {/* Add more saved pets dynamically here */}
          </div>
        </div>
      </div>
    </>
  );
}
