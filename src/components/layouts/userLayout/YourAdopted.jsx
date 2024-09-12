import React, { useState,useEffect } from 'react';
import Modal from '../../common/Modal'; // Import the reusable modal component
import AdoptionForm from './AdoptionForm';
import Navbar from './Navbar';
import { AdoptedPetGet } from '../../../services/user/Adopt';
const YourAdopted = () => {
  const [pets,setPets]=useState([])
  const fetchPets = async () => {
    try {
      const data = await AdoptedPetGet();
      console.log('get ',data);
      
      setPets(data.pets); // Adjust based on the response structure
    } catch (error) {
      console.log('Error fetching pets:', error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAdoptPet = (newPet) => {
    // Update the state with the new pet
    setPets((prevPets) => [...prevPets, newPet]);
    closeModal(); // Close modal after adding pet
  };

  return (
    <>
      {/* Navbar fixed at the top */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Navbar />
      </div>

      {/* Main content centered below the Navbar */}
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center pt-24"> {/* Adjust pt-24 to account for Navbar height */}
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Adopted Pets</h1>

          {/* New Adoption Button */}
          <div className="mb-6">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={openModal}
            >
              New Adoption
            </button>
          </div>

          {/* Pet Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pets.length > 0 ? (
              pets.map((pet, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img
                    src={pet.image}
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
              <p className="text-center text-gray-600 col-span-full">No pets adopted yet.</p>
            )}
          </div>
        </div>

        {/* Modal Component */}
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Adopt a New Pet">
          <AdoptionForm onAdoptSuccess={handleAdoptPet} />
        </Modal>
      </div>
    </>
  );
};

export default YourAdopted;
