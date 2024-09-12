import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import AdminLogin from '../../pages/admin/AdminLogin';
import AdminDashboard from '../../components/layouts/adminLayout/AdminDashboard';
import AdminProtect from '../../components/Protected/adminProtected/AdminProtect'
import UserListing from '../../components/layouts/adminLayout/UserListing';
export default function AdminRoute() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path='/admin/login' element={<AdminLogin />} />
        {/* <Route path='/admin/dashboard' element={<AdminDashboard />}/> */}
        <Route element={<AdminProtect />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />}>
            <Route path='users' element={<UserListing />} />  {/* Add a nested route for UserListing */}
          </Route>
        </Route>
        </Routes>
    </BrowserRouter>
  );
}
