import React from "react";
import { Routes, Route} from "react-router-dom";
import { AuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Agent from "./pages/Agent";

const App = () => {
  return (
    
        <AuthContextProvider>
        <Routes>

    

            <Route path='/'  element={<Home/>} />
            <Route path='/home'  element={<Home/>} />
            <Route path='/employees' element={<Agent/>} />
            
            {/* <Route path='/rides'  element={<ProtectedRoutes> <Rides/> </ProtectedRoutes>} /> */}

            
        </Routes>
        </AuthContextProvider>
          
  );
};

export default App;