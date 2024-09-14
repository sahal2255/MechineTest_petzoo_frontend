import React, { useState, useEffect } from 'react';
import { fullPetList, OwnerDetails } from '../../../services/user/Adopt';
import Navbar from './Navbar';
import Modal from '../../common/Modal'; // Import Modal component

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling the modal
  const [selectedPet, setSelectedPet] = useState(null);  // State to hold the selected pet
  const [userDetails, setUserDetails] = useState(null); 


  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fullPetList(); // Fetch from service
        setPets(response.pets || []); // Ensure you're accessing the `pets` key
      } catch (error) {
        console.error('Failed to fetch pets:', error);
        setError('Failed to load pets');
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handleImageClick = async(pet) => {
    setSelectedPet(pet);  
    setIsModalOpen(true); 
    console.log('selected pet owner id',pet.userId)
    try{
      const ownerData=await OwnerDetails(pet.userId)
      setUserDetails(ownerData)
    } catch(error){
      console.log('eror',error);
      
    }

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  
    setSelectedPet(null);  
    setUserDetails(null);
  };

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
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => handleImageClick(pet)} // Open modal when clicked
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

      {/* Modal for showing pet details */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={selectedPet?.name}>
        {/* Display pet details in the modal */}
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
          </div>
        )}
      </Modal>
    </>
  );
};

export default PetList;
