import React, { useEffect, useState } from 'react';
import DataTable from '../../common/DataTable'; // Import the reusable table
import { UserList } from '../../../services/admin/UserList';

// User Listing Component
const UserListing = () => {
  const [users,setUsers]=useState([])
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)

  useEffect(()=>{
    const fetchUsers=async()=>{
      try{
        const data=await UserList()
        console.log('data',data);
        
        setUsers(data)
      }catch (err) {
        setError('Failed to fetch user data');
        console.log('Error fetching users:', err);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    }
    fetchUsers()
    
  },[])
  const columns = [
    // { field: 'id', headerName: 'ID' },
    { field: 'userName', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'phoneNumber', headerName: 'Phone Number' },
  ];


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  

  return (
    <div>
      <h2>User Listing</h2>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UserListing;
