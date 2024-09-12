import React, { useState, useEffect } from 'react';
import { AdoptedPetGet } from '../../../services/user/Adopt'; // Adjust the import path as needed
import Navbar from './Navbar';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch pets when the component mounts
    const fetchPets = async () => {
      try {
        const response = await AdoptedPetGet();
        setPets(response.pets || []);
      } catch (error) {
        console.error('Failed to fetch pets:', error);
        setError('Failed to load pets');
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) return <p>Loading pets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center pt-24">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Available Pets for Adoption</h1>

        {/* Pet Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pets.length > 0 ? (
            pets.map((pet, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={pet.image || 'https://via.placeholder.com/150'}
                  alt={pet.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{pet.name}</h2>
                  <p className="text-gray-600">Age: {pet.age}</p>
                  <p className="text-gray-600">Breed: {pet.breed}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No pets available at the moment.</p>
          )}
        </div>
      </div>
    </div>
    </>

  );
};

export default PetList;
