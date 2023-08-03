import React, { useState , useEffect} from 'react'

import Footer from '../components/Footer'
import '../global-styles/global.css'
import { UserAuth } from '../context/UserAuthContext'
import AdminPage from '../components/AdminLandingPage/AdminPage'
import NavbarAdminLogout from '../components/NavbarAdminLogout'
import { db } from '../firebaseConfig';
import { getDocs,collection, deleteDoc, query, where, addDoc} from 'firebase/firestore';
import { RiH1 } from 'react-icons/ri'
import NavbarBasic from '../components/NavbarBasic'

const Admin = () => {

  const {user} = UserAuth();
  const userId = user.uid;
  const [adminData, setAdminData] = useState([0]);
  const [usertype, setType] = useState();

  useEffect(() => {
    const fetchData = async () => {
      
      const adminCollection = collection(db,`users/${userId}/details`);
      const adminSnapshot = await getDocs(adminCollection);
      const AdminList = adminSnapshot.docs.map(doc => doc.data());
      setAdminData(AdminList);
    adminData.map((x)=>(setType(x.usertype)));
    };
    fetchData();

    
  }, []);

  return (
    <>
    
    {user ? <NavbarAdminLogout/> : <NavbarBasic/>}
    {usertype === 'admin'?  <AdminPage/> : <h1 className='alert-admin'> Only Admin Users Can View This Page</h1> }
   
    <Footer/>
    </>
  )
}

export default Admin
