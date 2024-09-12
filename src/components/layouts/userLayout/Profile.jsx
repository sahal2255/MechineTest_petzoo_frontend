import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import { ProfileGet } from '../../../services/user/Profile';

export default function Profile() {
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
  });

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

  console.log('Profile page loaded');

  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Profile section, centered and spaced below the navbar */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-gray-100">
        <div className="max-w-lg w-full mx-auto p-10 rounded-2xl shadow-2xl border border-gray-300 bg-white">
          <div className="relative flex flex-col items-center">
            <h2 className="text-xl font-extrabold text-gray-800 mt-6 mb-2">{userData.userName}</h2>
            <p className="text-gray-600 text-xl">{userData.email}</p>
          </div>

          <div className="space-y-8 mt-6">
            <div className="flex items-center justify-between border-b border-gray-300 pb-4">
              <p className="text-gray-700 font-semibold text-xl">Username:</p>
              <p className="font-medium text-gray-900 text-xl">{userData.userName}</p>
            </div>
            <div className="flex items-center justify-between border-b border-gray-300 pb-4">
              <p className="text-gray-700 font-semibold text-xl">Email:</p>
              <p className="font-medium text-gray-900 text-xl">{userData.email}</p>
            </div>
            <div className="flex items-center justify-between border-b border-gray-300 pb-4">
              <p className="text-gray-700 font-semibold text-xl">Phone Number:</p>
              <p className="font-medium text-gray-900 text-xl">{userData.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
