import React, { useEffect, useState } from 'react';
import { UserList, PetList } from "../../../services/admin/UserList";
import { AdoptRequests } from "../../../services/admin/AdoptService";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [petCount, setPetCount] = useState(0);
  const [adoptionCount, setAdoptionCount] = useState(0);

  // Fetch counts for users, pets, and adoptions
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const users = await UserList();
        const pets = await PetList();
        const adoptions = await AdoptRequests();
  
        setUserCount(users.length);
        setPetCount(pets.length);
        setAdoptionCount(adoptions.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-4xl font-bold">{userCount}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Total Pets</h2>
          <p className="text-4xl font-bold">{petCount}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Total Adoptions</h2>
          <p className="text-4xl font-bold">{adoptionCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
