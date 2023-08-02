import React from 'react'
import '../component-styles/customer-landing.css'
import {FaDollarSign} from 'react-icons/fa/'
import{MdOutlinePublishedWithChanges} from 'react-icons/md'
import {BsFillArrowDownCircleFill} from 'react-icons/bs'


const CustomerFeatures = () => {
  return (

    <>
    
  <div className="features" id='features-link'>
    <h5 className='coloredm'>Features</h5>
    <div className="card-holder-features">
      <div className="cards">
      <FaDollarSign className='fea'/>
        <h5>Payments</h5>
      </div>
      <div className="cards">
       <MdOutlinePublishedWithChanges className='fea'/>
        <h5>Track Bills</h5>
      </div>
      <div className="cards">
       <BsFillArrowDownCircleFill className='fea'/>
        <h5>Download</h5>
      </div>
    </div>
  </div>
    
    </>

  )
}

export default CustomerFeatures