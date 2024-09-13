import React, { useEffect, useState } from 'react';
import DataTable from '../../common/DataTable';
import { PetList } from '../../../services/admin/UserList';
import Modal from '../../common/Modal';
import PetDetails from '../adminLayout/PetDetails';
import AdoptionForm from '../userLayout/AdoptionForm';

const PetListing = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdoption,setIsAdoption]=useState(false)
  // Fetch the pets on component mount
  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const data = await PetList();
        setPets(data);
      } catch (err) {
        setError('Failed to fetch pet data');
        console.error('Error fetching pets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Function to handle "View" button click
  const handleViewPet = (pet) => {
    setSelectedPet(pet); // Set the selected pet
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedPet(null); // Clear the selected pet
    setIsModalOpen(false); // Close the modal
  };

  const handleAddPet=()=>{
    setIsModalOpen(true)
    setIsAdoption(true)
  }
  // Define columns for the DataTable
  const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'age', headerName: 'Age' },
    { field: 'breed', headerName: 'Breed' },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (row) => (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
          onClick={() => handleViewPet(row)} // On clicking "View" button, trigger modal
        >
          View
        </button>
      ),
    },
  ];

  // Display loading or error state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Pet Listing</h2>
      <button
      onClick={handleAddPet}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 ease-in-out"
      >
        Add New Pet
      </button>
      <DataTable columns={columns} data={pets} /> {/* Display the pet list */}

      {/* Conditionally render the modal based on isModalOpen */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedPet?.name || 'Pet Details'}
        >
          {isAdoption && <AdoptionForm />}
          {/* Pass the selected pet to the PetDetails component */}
          {selectedPet && <PetDetails pet={selectedPet} />}
        </Modal>
      )}
    </div>
  );
};

export default PetListing;
