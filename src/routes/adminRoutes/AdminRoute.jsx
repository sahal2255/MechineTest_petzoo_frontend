import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import AdminLogin from '../../pages/admin/AdminLogin';
import AdminDashboard from '../../components/layouts/adminLayout/AdminDashboard';
import AdminProtect from '../../components/Protected/adminProtected/AdminProtect'
import UserListing from '../../components/layouts/adminLayout/UserListing';
import PetListing from '../../components/layouts/adminLayout/PetListing';
export default function AdminRoute() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route element={<AdminProtect />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />}>
            <Route path='users' element={<UserListing />} />  
            <Route path='petlist' element={<PetListing />}/>
          </Route>
        </Route>
        </Routes>
    </BrowserRouter>
  );
}
