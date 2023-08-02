import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../components/component-styles/customer-landing.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function AdminForm() {
const [email, setEmail] = useState();
const [pass, setPass] = useState();


const { signin , googleSignIn, user} = UserAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try{
       await signin(email, pass);
       navigate('/admin');
    } 
    catch(e){
      setError(e.message);
      console.log(e.message);
    }
  };


  return (
    <Card  className='car-card' bg='light'>
   

      <Card.Body >
     
     
      <Form xs="auto" className='form-admin' onSubmit={''}>
      <Card.Title className='title'>Admin Login</Card.Title>
     

        <Form.Group className="mb-3 none " controlId="formBasicPassword">
       
        
        <Form.Control style={{fontSize:12, height:44, margin:'.1rem'}} className='field' placeholder='Email' autoComplete='on'  type='email' onChange={(e)=>setEmail(e.target.value)} required/>
        <Form.Control style={{fontSize:12, height:44, margin:'.1rem'}}  className='field' placeholder='Password' autoComplete='on' type='password' onChange={(e)=>setPass(e.target.value)} required/>

        <Button type='submit' id='btn-action-admin'> Login</Button>
    
        </Form.Group>
    
  
  
      </Form>
      </Card.Body>
    </Card> 
  );
}


function AdminLogin() {
  return (
    <AdminForm/>
  )
}

export default AdminLogin