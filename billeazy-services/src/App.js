import React from "react";
import { Routes, Route} from "react-router-dom";
import { AuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Agent from "./pages/Agent";
<<<<<<< Updated upstream
import Admin from "./pages/Admin";
=======
import AdminLoginPage from "./pages/AdminLoginPage";
import ProtectedAdminRoutes from "./components/ProtectedAdminRoutes";
>>>>>>> Stashed changes

const App = () => {
  return (
    
        <AuthContextProvider>
        <Routes>

    

            <Route path='/'  element={<Home/>} />
            <Route path='/adminlogin'  element={<AdminLoginPage/>} />

            <Route path='/admin' element={<ProtectedAdminRoutes> <AdminLoginPage/> </ProtectedAdminRoutes>} />
            <Route path='/employees' element={<Agent/>} />
            <Route path='/admin' element={<Admin/>} />
            
            {/* <Route path='/rides'  element={<ProtectedRoutes> <Rides/> </ProtectedRoutes>} /> */}

            
        </Routes>
        </AuthContextProvider>
          
  );
};

export default App;