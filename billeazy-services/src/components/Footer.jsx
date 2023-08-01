import React from 'react'
import '../components/component-styles/footer.css'
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <>
      <div className="footer" id='footer-link'>

        <div className="footer-left">
        <img src={logo} alt="RydMate" className='logo' />
        <h5>Billing Made Easy</h5>
        </div>

        <div className="footer-right">
            <h4>
                <b>Contact Us</b> <br />
                +91 7028193277 <br />
                Gera Imperium , Panjim - Goa
            </h4>
        </div>
       
      </div>
    </>
  )
}

export default Footer
