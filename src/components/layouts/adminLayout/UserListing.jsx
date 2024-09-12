import React from 'react';
import DataTable from '../../common/DataTable'; // Import the reusable table

// User Listing Component
const UserListing = () => {
  // Define columns and data for the user table
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'role', headerName: 'Role' },
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'User' },
  ];

  return (
    <div>
      <h2>User Listing</h2>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UserListing;
