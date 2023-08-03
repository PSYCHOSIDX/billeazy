import React from "react";
import { Routes, Route} from "react-router-dom";
import { AuthContextProvider } from "./context/UserAuthContext";
import ProtectedAdminRoutes from "./components/ProtectedAdminRoutes";

import Agent from "./pages/Agent";
import Admin from "./pages/Admin";
import UploadFile from "./components/UploadFile";

import AdminLoginPage from "./pages/AdminLoginPage"

import Customer from "./pages/Customer";
import CustomerLandingPage from "./pages/CustomerLandingPage";
import ProtectedCustomerRoutes from "./components/ProtectedAdminRoutes";
import AddCustomerConnection from "./pages/AddCustomerConnection"
import UploadHistory from "./components/UploadHistory";
import AgentUploadHistory from "./pages/AgentUploadHistory";

const App = () => {
  return (
        <AuthContextProvider>
        <Routes>
            <Route path='/'  element={<CustomerLandingPage/>} />
            <Route path='/adminlogin'  element={<AdminLoginPage/>} />
            <Route path='/admin' element={<ProtectedAdminRoutes> <Admin/> </ProtectedAdminRoutes>} />
            <Route path='/employees' element={<Agent/>} />
            <Route path='/employees/upload' element={<UploadFile/>} />
            <Route path='/employees/uploadhistory' element={<AgentUploadHistory/>} />
          <Route path="/customer" element={<ProtectedCustomerRoutes><Customer/></ProtectedCustomerRoutes>} />
          <Route path="/addcustomerlink" element={<ProtectedCustomerRoutes><AddCustomerConnection/></ProtectedCustomerRoutes>} />


        </Routes>
        </AuthContextProvider>
          
  );
};

export default App;