import React from "react";
// import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AdminRoute from './routes/adminRoutes/AdminRoute';
import UserRoute from './routes/userRoute/UserRoute'; // Ensure correct path
import Toastify from "./components/common/Toastify";
function App() {
  return (
      <>
          <Toastify />
        <AdminRoute />
        <UserRoute />
      </>
      
  );
}

export default App;
