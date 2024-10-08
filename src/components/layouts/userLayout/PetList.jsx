import React, { useState, useEffect } from 'react';
import { fullPetList, OwnerDetails, ConfirmAdoption } from '../../../services/user/Adopt';
import Navbar from './Navbar';
import Modal from '../../common/Modal'; 
import { showErrorToast, showSuccessToast } from '../../common/Toastify';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]); // State for filtered pets
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);  
  const [userDetails, setUserDetails] = useState(null); 
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fullPetList();
        setPets(response.pets || []);
        setFilteredPets(response.pets || []); // Set filtered pets initially
      } catch (error) {
        console.error('Failed to fetch pets:', error);
        setError('Failed to load pets');
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    // Filter pets based on search query
    const filtered = pets.filter((pet) => 
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(pet.age).includes(searchQuery)
    );
    setFilteredPets(filtered);
  }, [searchQuery, pets]); // Run the filter whenever search query or pets data changes

  const handleImageClick = async (pet) => {
    setSelectedPet(pet);  
    setIsModalOpen(true); 
    try {
      const ownerData = await OwnerDetails(pet.userId);
      setUserDetails(ownerData);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  
    setSelectedPet(null);  
    setUserDetails(null);
  };

  const handleConfirmAdoptionClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleAdoptionSubmit = async () => {
    if (selectedPet && userDetails) {
      try {
        const response = await ConfirmAdoption(selectedPet._id, userDetails._id);
        showSuccessToast(response.message); 
        setIsConfirmModalOpen(false);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Failed to confirm adoption:', error);
        showErrorToast(error.message);
      }
    }
  };

  if (loading) return <p>Loading pets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center pt-24">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Available Pets for Adoption</h1>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name, breed, or age"
            className="mb-6 p-2 border rounded w-1/2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />

          {/* Pet Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img
                    src={pet.image || 'https://via.placeholder.com/150'}
                    alt={pet.name}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => handleImageClick(pet)}
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

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedPet?.name}>
        {selectedPet && (
          <div className="p-4">
            <img
              src={selectedPet.image || 'https://via.placeholder.com/150'}
              alt={selectedPet.name}
              className="w-full h-48 object-cover mb-4"
            />
            <p className="text-gray-800">Name: {selectedPet.name}</p>
            <p className="text-gray-800">Age: {selectedPet.age}</p>
            <p className="text-gray-800">Breed: {selectedPet.breed}</p>
            {userDetails && (
              <>
                <h3 className="text-lg font-semibold mt-4">Owner Information</h3>
                <p className="text-gray-800">User: {userDetails.userName}</p>
                <p className="text-gray-800">Email: {userDetails.email}</p>
                <p className="text-gray-800">Phone Number: {userDetails.phoneNumber}</p>
              </>
            )}
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
              onClick={handleConfirmAdoptionClick}
            >
              Confirm Adoption
            </button>
          </div>
        )}
      </Modal>

      {selectedPet && (
        <Modal isOpen={isConfirmModalOpen} onClose={handleConfirmClose} title="Confirm Adoption">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Adoption</h3>
            <p className="text-gray-800">Are you sure you want to adopt {selectedPet.name}?</p>
            <p className="text-gray-800">Age: {selectedPet.age}</p>
            <p className="text-gray-800">Breed: {selectedPet.breed}</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmClose}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleAdoptionSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PetList;
