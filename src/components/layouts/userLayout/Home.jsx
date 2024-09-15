import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { fullPetList } from '../../../services/user/Adopt';

export default function Home() {
  const [pets, setPets] = useState([]); // Initialize pets as an empty array
  const [loading, setLoading] = useState(true); // Loading state to show while fetching
  const [error, setError] = useState(null); // Error state to handle fetch errors
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fullPetList(); // Fetch pets from the service
        setPets(response.pets || []); // Set the fetched pets
      } catch (error) {
        console.error('Failed to fetch pets:', error);
        setError('Failed to load pets'); // Set error message
      } finally {
        setLoading(false); // Turn off loading once data is fetched
      }
    };

    fetchPets();
  }, []);

  // Filter pets based on search term
  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Limit the number of displayed pets
  const DISPLAY_LIMIT = 6;
  const displayedPets = filteredPets.slice(0, DISPLAY_LIMIT);

  if (loading) {
    return <p>Loading pets...</p>; // Display while data is being fetched
  }

  if (error) {
    return <p>{error}</p>; // Display error if fetching fails
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full text-white text-center">
        <Navbar />
      </header>
      <main className="flex flex-col items-center mt-32 w-full px-4">
        <h2 className="text-2xl font-semibold mb-4">Find Your New Best Friend</h2>
        <input
          type="text"
          placeholder="Search by name or breed..."
          className="mb-8 p-2 border border-gray-300 rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {displayedPets.length > 0 ? (
            displayedPets.map(pet => (
              <div key={pet._id} className="bg-white p-4 rounded shadow">
                <img
                  src={pet.image || 'https://via.placeholder.com/150'}
                  alt={pet.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-bold">{pet.name}</h3>
                <p className="text-gray-700">Breed: {pet.breed}</p> {/* Display the breed */}
                <p className="text-gray-700">Type: {pet.type}</p>
              </div>
            ))
          ) : (
            <p>No pets found</p> // Display message when no pets match the search term
          )}
        </div>
      </main>
      <footer className="bg-gray-800 w-full py-4 text-white text-center mt-auto">
        <p>© 2024 Pet Adoption Services. All rights reserved.</p>
      </footer>
    </div>
  );
}
