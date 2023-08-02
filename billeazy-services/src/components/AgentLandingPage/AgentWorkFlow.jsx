import React from 'react'
import '../component-styles/agent-landing.css'

import {MdAppRegistration} from 'react-icons/md'
import {RiAiGenerate} from 'react-icons/ri'
import {FaFileImport} from 'react-icons/fa'

const AgentWorkFlow = () => {
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
      <FaFileImport className='fea'/>
        <h5>Import Meter Data</h5>
      </div>
      <div className="cards">
      <RiAiGenerate className='fea'/>
        <h5>Upload Bills</h5>
      </div>
    </div>
  </div>
    
    </>

  )
}

export default AgentWorkFlow