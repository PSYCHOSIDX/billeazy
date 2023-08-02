import React from 'react'
import '../component-styles/customer-landing.css'
import {BiSolidDollarCircle} from 'react-icons/bi'
import{HiDocumentSearch} from 'react-icons/hi'
import {MdAppRegistration} from 'react-icons/md'


const CustomerWorkFlow = () => {
  return (

    <>
    
  <div className="work" id='work-link'>
    <br />
    <h5 className='coloredx'>Work flow</h5>
    <div className="card-holder-features">
      <div className="cards">
     <MdAppRegistration className='fea'/>
        <h5>Register</h5>
      </div>
      <div className="cards">
      <HiDocumentSearch className='fea'/>
        <h5>Search</h5>
      </div>
      <div className="cards">
      <BiSolidDollarCircle className='fea'/>
        <h5>Pay</h5>
      </div>
    </div>
  </div>
    
    </>

  )
}

export default CustomerWorkFlow