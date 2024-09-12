import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLogin from '../../pages/user/UserLogin';
import UserSign from '../../pages/user/UserSign';
import Home from '../../components/layouts/userLayout/Home';
import Profile from '../../components/layouts/userLayout/Profile';
import UserProtect from '../../components/Protected/userProtected/UserProtect';

export default function UserRoute() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSign />} />
        <Route path='/' element={<Home />} />
        {/* <Route path='/profile' element={<Profile />} /> */}
        
        <Route element={<UserProtect />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
