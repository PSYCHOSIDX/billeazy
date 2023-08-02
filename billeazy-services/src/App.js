import React from "react";
import { Routes, Route} from "react-router-dom";
import { AuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
<<<<<<< Updated upstream
import Agent from "./pages/Agent";

const App = () => {
  return (
    
        <AuthContextProvider>
        <Routes>

    

            <Route path='/'  element={<Home/>} />
<<<<<<< Updated upstream
            <Route path='/employees' element={<Agent/>} />
            
            {/* <Route path='/rides'  element={<ProtectedRoutes> <Rides/> </ProtectedRoutes>} /> */}

            
        </Routes>
        </AuthContextProvider>
          
  );
};

export default App;