import React from "react";
import { Routes, Route} from "react-router-dom";
import { AuthContextProvider } from "./context/UserAuthContext";


import Agent from "./pages/Agent";
import Admin from "./pages/Admin";
import UploadFile from "./components/UploadFile";

import AdminLoginPage from "./pages/AdminLoginPage"
import AgentUploadHistory from "./pages/AgentUploadHistory";
import Customer from "./pages/Customer";
import CustomerLandingPage from "./pages/CustomerLandingPage";
import ProtectedCustomerRoutes from "./components/ProtectedCustomerRoutes";
import ProtectedAdminRoutes from "./components/ProtectedCustomerRoutes";
import ProtectedAgentRoutes from "./components/ProtectedAgentRoutes";
import AddCustomerConnection from "./pages/AddCustomerConnection"
import AddAgentConnection from "./pages/AddAgentConnection";
import GenerateBill from "./pages/GenerateBill";

const App = () => {
  return (
        <AuthContextProvider>
        <Routes>
            <Route path='/'  element={<CustomerLandingPage/>} />
            <Route path='/adminlogin'  element={<AdminLoginPage/>} />
            <Route path='/admin' element={<ProtectedAdminRoutes> <Admin/> </ProtectedAdminRoutes>} />
            <Route path="/admin/generate-bill" element={<ProtectedAdminRoutes> <GenerateBill/> </ProtectedAdminRoutes>} />

            <Route path='/employees' element={<Agent/>} />
            <Route path='/employees/upload' element={<ProtectedAgentRoutes> <UploadFile/> </ProtectedAgentRoutes>} />
            <Route path='/employees/uploadhistory' element={<ProtectedAgentRoutes><AgentUploadHistory/></ProtectedAgentRoutes>} />
            <Route path="/addemployeelink" element={<ProtectedCustomerRoutes><AddAgentConnection/></ProtectedCustomerRoutes>} />

        
          <Route path="/customer" element={<ProtectedCustomerRoutes><Customer/></ProtectedCustomerRoutes>} />
          <Route path="/addcustomerlink" element={<ProtectedCustomerRoutes><AddCustomerConnection/></ProtectedCustomerRoutes>} />


        </Routes>
        </AuthContextProvider>
          
  );
};

export default App;
