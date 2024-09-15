import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import { AdoptionRequest, ProfileGet } from '../../../services/user/Profile';
import { useNavigate } from 'react-router-dom'; // For navigating after logout

export default function Profile() {
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
  });
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const navigate = useNavigate();

  // Fetch user profile details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await ProfileGet();
        setUserData({
          userName: response.data.userName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
        });
      } catch (err) {
        console.error('Error fetching profile data:', err);
      }
    };

    fetchProfile();
  }, []);

  // Fetch adoption requests
  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        const response = await AdoptionRequest();
        setAdoptionRequests(response.data); // Store the adoption requests
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching adoption requests:', error);
      }
    };
    fetchAdoptionRequests();
  }, []);

  // Logout handler
  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0';
    navigate('/login');
  };

  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main Profile Container */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-28 bg-gray-50 space-y-10">
        
        {/* Profile Section */}
        <div className="max-w-lg w-full mx-auto p-8 rounded-2xl shadow-lg border border-gray-300 bg-white">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-800 mt-4">{userData.userName}</h2>
            <p className="text-gray-600 text-lg mt-2">{userData.email}</p>
            <p className="text-gray-600 text-lg">{userData.phoneNumber}</p>
          </div>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-8 bg-red-500 text-white font-bold py-2 px-8 rounded-full shadow-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Adoption Requests Section */}
        <div className="max-w-2xl w-full mx-auto p-10 rounded-2xl shadow-lg border border-gray-300 bg-white">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Adoption Requests</h3>
          <div className="space-y-6">
            {/* Map through the adoptionRequests array to display each request */}
            {adoptionRequests.length > 0 ? (
              adoptionRequests.map((request) => (
                <div key={request._id} className="flex flex-col border-b pb-6">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-semibold text-gray-700">
                      Pet Name: {request.petId}
                    </p>
                    <p className="text-gray-600">
                      Adopted on: {new Date(request.adoptedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-gray-500">Status: {request.status}</p>
                  <p className="text-gray-500">Owner: {request.ownerId}</p>
                  <p className="text-gray-500">Adoption ID: {request._id}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">No adoption requests found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
