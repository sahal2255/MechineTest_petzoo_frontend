import React from 'react';

const PetDetails = ({ pet }) => {
  if (!pet) {
    return <p>No pet selected</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
      {/* Pet Image */}
      <div className="relative">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-72 object-cover rounded-t-lg"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-gray-900 to-transparent text-white p-6 w-full">
          <h1 className="text-3xl font-bold">{pet.name}</h1>
          <p className="text-sm italic">{pet.breed}</p>
        </div>
      </div>

      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Pet Information</h2>

        {/* Age, Breed, and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-gray-600 mb-2">
              <strong>Age:</strong> {pet.age} years
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Breed:</strong> {pet.breed}
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-2">
              <strong>Status:</strong> {pet.status ? 'Available' : 'Adopted'}
            </p>
          </div>
        </div>

        {/* Description */}
        {pet.description && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Description:</h3>
            <p className="text-gray-700">{pet.description}</p>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default PetDetails;
