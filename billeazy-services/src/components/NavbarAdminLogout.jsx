
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import '../components/component-styles/navbar.css';
import '../components/component-styles/userprofile.css'
import { UserAuth } from '../context/UserAuthContext';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {FaRegUser} from 'react-icons/fa'
import {RiMenu3Fill} from 'react-icons/ri'
import './component-styles/customer-landing.css'

// eslint-disable-next-line
import { 
   doc, 
   updateDoc
  } from "firebase/firestore";

import { db } from '../firebaseConfig';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { RiMenu2Line} from 'react-icons/ri';



// This is profile finction this contains all sidebar


function Profile({ name, ...props }) {
  
 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {user} = UserAuth();
  const {logout} = UserAuth();
  const navigate = useNavigate();
 
  const handleLogout = async () => {
    try{
      await logout();
      navigate('/adminlogin')
    } catch(e) {
      console.log(e.message);
    }
  }

  return (
    <>
         <h5 onClick={handleShow} className='username' >
          <b>{user && user.email}</b> 
        </h5>

         {user.photoURL ? <img onClick={handleShow} src={user.photoURL} alt='' className='profile'/>  : 
         <RiMenu3Fill onClick={handleShow} className='usericon'/>} 
       
        <Offcanvas className='colorxx' show={show} onHide={handleClose} id='sidebar'{...props}>

        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='user-title'> USER PROFILE  </Offcanvas.Title>
        </Offcanvas.Header>
        <br/>
    
        {/* {fireUser.map((fire) => ( */}
          
        <Offcanvas.Body>
      
       {
          user.photoURL ? <img src={user.photoURL} alt='' className='profile'/> : <FaRegUser  className='usericonx'  />}
          {/* <h4> <b>Name</b> </h4>
          <h5>{user.displayName}</h5>  */}
          <br/>
          <h4><b>Email</b></h4>
          <h5>{user.email}</h5>


           <Link className='link' to='/admin'>
              <Button as="input" id='update-button-x' type="button" value="Home"/> 
          </Link>
         
          
          <button onClick={handleLogout} className='btn-action-admin' id='visible'> Logout </button>
          
          {/* {user.phoneNumber ? 
          
          <div>
            <h4> <b>Phone Number</b> </h4>
          <h5>{user.phoneNumber}</h5> 
          
          </div>
          
          : <StaticExample/>
          
          } */}

        </Offcanvas.Body>
     

      </Offcanvas>
    </>
  );
}

function InfoPage() {
  return (
    <>
    {['end'].map((placement, idx) => (
      <Profile key={idx} placement={placement} name={placement} />
    ))}
  </>
  );
}


function NavbarAdminLogout(){
  const {logout} = UserAuth();
  const navigate = useNavigate();
 
  const handleLogout = async () => {
    try{
      await logout();
      navigate('/')
    } catch(e) {
      console.log(e.message);
    }
  }


  
  
  return (
    <>
      <Navbar className='custom-nav'>
      <Container className='container'>
        <Navbar.Brand href="/admin">
        <img className='logo' src={logo} alt="BillEazy" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='n' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-hold">
           
           <InfoPage/>


            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    </>
  );
}




export default NavbarAdminLogout