import React, { useEffect, useState } from 'react';
import DataTable from '../../common/DataTable';
import { PetList } from '../../../services/admin/UserList';
import Modal from '../../common/Modal';
import PetDetails from '../adminLayout/PetDetails';
import AdminAdoptForm from './AdminAdoptForm';

const PetListing = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdoption, setIsAdoption] = useState(false);

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
    setSelectedPet(pet);
    setIsAdoption(false); // Set adoption form to false
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedPet(null);
    setIsModalOpen(false);
  };

  // Function to handle adding new pet
  const handleAddPet = () => {
    setIsAdoption(true); // Show adoption form
    setIsModalOpen(true);
  };

  // Handle adoption success and close modal
  const handleAdoptSuccess = (newPet) => {
    setPets([...pets, newPet]); // Add newly adopted pet to the list
    handleCloseModal(); // Close the modal
  };

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
          onClick={() => handleViewPet(row)}
        >
          View
        </button>
      ),
    },
  ];

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
      <DataTable columns={columns} data={pets} />

      {/* Modal for viewing pet details or adding new pet */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={isAdoption ? 'Add New Pet' : selectedPet?.name || 'Pet Details'}
        >
          {isAdoption ? (
            <AdminAdoptForm onAdoptSuccess={handleAdoptSuccess} />
          ) : (
            <PetDetails pet={selectedPet} />
          )}
        </Modal>
      )}
    </div>
  );
};

export default PetListing;
