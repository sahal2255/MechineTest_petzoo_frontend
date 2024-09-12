import React, { useState } from 'react';
import Navbar from './Navbar';

const pets = [
  { id: 1, name: 'Buddy', type: 'Dog', image: 'dog.jpg' },
  { id: 2, name: 'Mittens', type: 'Cat', image: 'cat.jpg' },
  { id: 3, name: 'Charlie', type: 'Dog', image: 'dog2.jpg' },
  { id: 4, name: 'Luna', type: 'Cat', image: 'cat2.jpg' },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className=" w-full text-white text-center">
        <Navbar />
      </header>
      <main className="flex flex-col items-center mt-32 w-full px-4">
        <h2 className="text-2xl font-semibold mb-4">Find Your New Best Friend</h2>
        <input
          type="text"
          placeholder="Search for pets..."
          className="mb-8 p-2 border border-gray-300 rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {filteredPets.map(pet => (
            <div key={pet.id} className="bg-white p-4 rounded shadow">
              <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-xl font-bold">{pet.name}</h3>
              <p className="text-gray-700">{pet.type}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-gray-800 w-full py-4 text-white text-center mt-auto">
        <p>© 2024 Pet Adoption Services. All rights reserved.</p>
      </footer>
    </div>
  );
}
