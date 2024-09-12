import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import AdminLogin from '../../pages/admin/AdminLogin';

export default function AdminRoute() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path='/admin/login' element={<AdminLogin />} />
        </Routes>
    </BrowserRouter>
  );
}
