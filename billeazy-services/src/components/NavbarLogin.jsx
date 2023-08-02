import React , {useState}from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import { useNavigate} from "react-router-dom";
import '../components/component-styles/navbar.css';
import { UserAuth } from "../context/UserAuthContext.js";


function NavbarLogin(){
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signin , googleSignIn, user} = UserAuth();

  const handleGoogleSignIn = async() =>{
    setError('');
    try{
      await googleSignIn(); 
    } catch(e){
      setError(e.message);
      console.log(e.message);
    }
  }



  return (
    <>
      <Navbar className='custom-nav'>
      <Container className='container'>
        <Navbar.Brand href="/">
          <img className='logo' src={logo}  />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='n' />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-hold">
          <ul className='link-collection'>
      <li > <a href='#features-link'>Features</a></li>
       <li > <a href='#work-link'>Working</a></li>
       <li > <a href='#footer-link'>Contact</a></li>
       </ul>
            <Link onClick={handleGoogleSignIn} className='link'>
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
