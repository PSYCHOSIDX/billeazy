import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import '../components/component-styles/navbar.css';

function NavbarLogin(){
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
          <ul className='link-collection'>
      <li > <a href='#features-link'>Features</a></li>
       <li > <a href='#work-link'>Working</a></li>
       <li > <a href='#footer-link'>Contact</a></li>
       </ul>
            <Link to="/login" className='link'>
            <a className='btn-contact' >Login</a>
            </Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    </>
  );
}




export default NavbarLogin;
