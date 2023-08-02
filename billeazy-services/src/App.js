import React from "react";
import { Routes, Route} from "react-router-dom";
import { AuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Agent from "./pages/Agent";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

const App = () => {
  return (
        <AuthContextProvider>
        <Routes>

    

            <Route path='/'  element={<Home/>} />
            <Route path='/employees' element={<Agent/>} />
            <Route path='/admin' element={<Admin/>} />
            
            {/* <Route path='/rides'  element={<ProtectedRoutes> <Rides/> </ProtectedRoutes>} /> */}
          <Route path="/login" element={<Login/>} />
          <Route path="/admin" element={<Admin/>} />
          
        </Routes>
        </AuthContextProvider>
          
  );
};

export default App;