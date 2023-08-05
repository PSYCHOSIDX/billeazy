import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/UserAuthContext";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/esm/Container";
import logo from '../assets/logo.png'
import { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import Offcanvas from 'react-bootstrap/Offcanvas';
import {FaRegUser} from 'react-icons/fa'
import Button from "react-bootstrap/esm/Button";


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
        navigate('/employees')
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
function NavbarAgentLogout(){
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
  export default NavbarAgentLogout;