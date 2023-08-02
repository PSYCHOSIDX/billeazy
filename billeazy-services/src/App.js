import React from "react";
import { Routes, Route} from "react-router-dom";
import { AuthContextProvider } from "./context/UserAuthContext";
import ProtectedAdminRoutes from "./components/ProtectedAdminRoutes";
import Customer from "./pages/Customer";
import Agent from "./pages/Agent";
import Admin from "./pages/Admin";

import AdminLoginPage from "./pages/AdminLoginPage"

const App = () => {
  return (
        <AuthContextProvider>
        <Routes>

    

            <Route path='/'  element={<Customer/>} />

            <Route path='/adminlogin'  element={<AdminLoginPage/>} />

            <Route path='/admin' element={<ProtectedAdminRoutes> <Admin/> </ProtectedAdminRoutes>} />

            <Route path='/employees' element={<Agent/>} />
            
            
            {/* <Route path='/rides'  element={<ProtectedRoutes> <Rides/> </ProtectedRoutes>} /> */}
   
          <Route path="/admin" element={<Admin/>} />
          
        </Routes>
        </AuthContextProvider>
          
  );
};

export default App;