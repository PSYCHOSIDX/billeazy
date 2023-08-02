import React from 'react'
import '../component-styles/customer-landing.css'
import line from '../../assets/line.png'
const CustomerLanding = ({id}) => {
  return (

    <>
    
    <div className="call-box" id={id}>

        <div className="holder">

            <h1 className='customer-text'>Track and Pay Electricity Bills Easily with BillEazy</h1>
            <button className='btn-action' ><b>Let's Start</b></button>
        <img className='line-img' src={line} alt="......." />
        </div>

   
    </div>
    
    </>

  )
}

export default CustomerLanding