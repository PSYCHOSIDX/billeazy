
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
      navigate('/')
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
         <FaRegUser onClick={handleShow} className='icon'/>} 
       
        <Offcanvas show={show} onHide={handleClose} id='sidebar'{...props}>

        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='user-title'> USER PROFILE  </Offcanvas.Title>
        </Offcanvas.Header>
        <br/>
    
        {/* {fireUser.map((fire) => ( */}
          
        <Offcanvas.Body>
      
       {
          user.photoURL ? <img src={user.photoURL} alt='' className='profile'/> : <FaRegUser  className='icon' id='icon' />}
          <h4> <b>Name</b> </h4>
          <h5>{user.displayName}</h5> 
          <br/>
          <h4><b>Email</b></h4>
          <h5>{user.email}</h5>


           <Link className='link' to='/'>
              <Button as="input" id='update-button-x' type="button" value="Home"/> 
          </Link>
          <Link className='link' to='/rides'>
              <Button as="input" id='update-button-x' type="button" value="Search Rides"/> 
          </Link>
         

          <Link className='link' to='/rewards'>
              <Button as="input" id='update-button-x' type="button" value="Rewards"/> 
          </Link>
          <Link className='link' to='/emergency'>
              <Button as="input" id='update-button-x' type="button" value="Emergency Contacts"/> 
          </Link>

          <Link className='link' to='/viewrides'>
              <Button as="input" id='update-button-x' type="button" value="My Rides"/> 
          </Link>
          
          <button onClick={handleLogout} className='btn-contact' id='visible'> Logout </button>
          
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


function NavbarLogout(){
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
        <Navbar.Brand href="/">
        <img className='logo' src={logo} alt="RydMate" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='n' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-hold">
           
           <InfoPage/>


            {/* <Link to="" className='link'>
            <button onClick={handleLogout} className='btn-contact'> Logout </button>
            </Link> */}

            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    </>
  );
}




export default NavbarLogout;
