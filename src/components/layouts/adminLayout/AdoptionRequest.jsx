import React, { useEffect, useState } from 'react';
import DataTable from '../../common/DataTable'; // Import the reusable DataTable component
import { AdoptRequests, updateAdoptionStatus } from '../../../services/admin/AdoptService'; // Import the API functions

const AdoptionRequests = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);

  // Fetch the adoption requests dynamically when the component mounts
  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        const response = await AdoptRequests(); // Fetch data from the server
        setAdoptionRequests(response); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching adoption requests:', error);
      }
    };

    fetchAdoptionRequests(); // Call the fetch function on mount
  }, []);

  // Function to handle the status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAdoptionStatus(id, newStatus); // API call to update the status
      // Update the local state with the new status
      setAdoptionRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      console.error('Error updating adoption status:', error);
    }
  };

  // Define columns for the DataTable
  const columns = [
    { field: '_id', headerName: 'Request ID' },
    { field: 'userName', headerName: 'User Name' },
    { field: 'petName', headerName: 'Pet Name' },
    { field: 'status', headerName: 'Status', renderCell: (row) => (
      <select
        value={row.status}
        onChange={(e) => handleStatusChange(row._id, e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="rejected">Rejected</option>
      </select>
    ) },
    { field: 'adoptedAt', headerName: 'Adopted On', renderCell: (row) => new Date(row.adoptedAt).toLocaleDateString() },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Adoption Requests</h1>
      <DataTable columns={columns} data={adoptionRequests} />
    </div>
  );
};

export default AdoptionRequests;
