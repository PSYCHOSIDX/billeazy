import React from 'react'
import '../component-styles/agent-landing.css'
import line from '../../assets/line.png'
import bill from '../../assets/bill.png'

const AgentLanding = () => {
  return (

    <>
    
    <div className="call-box" >

        <div className="holder">
            <div className="sec">
              <div className="left">
              <h1 className='customer-text'>Import Meter Data and Distribute Bills Easily with BillEazy</h1>
            <a className='btn-action' href='/employees'>Let's Start</a>
              </div>

              <div className="right">
                <img src={bill} className='bill-img'/>
              </div>
            
            </div>
            
        <img className='line-img' src={line} alt="......." />
        </div>

   
    </div>
    
    </>

  )
}

export default AgentLanding