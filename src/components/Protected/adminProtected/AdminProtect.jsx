import React, { useEffect, useState } from 'react'
import { Navigate,Outlet } from 'react-router-dom';

const  UserProtect=()=> {
    const [authenticated,setAuthenticated]=useState(null)

    useEffect(()=>{
        const checkAuth=()=>{
            const token = document.cookie.split('; ').find(row => row.startsWith('token='));
            console.log('token founded',token);
            if (token) {
                setAuthenticated(true);
              } else {
                setAuthenticated(false);
              }
            };
            checkAuth();
          }, [])
          if (authenticated === null) {
            return <div>Loading</div>; // Or a spinner/loading indicator
          }
        
          if (!authenticated) {
            console.log('Navigating to login'); // Debugging line
            return <Navigate to="/admin/login" />;
          }
        
          return <Outlet />
        };

export default UserProtect