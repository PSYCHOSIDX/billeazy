import React from 'react'
import '../component-styles/agent-landing.css'
import {RiAiGenerate} from 'react-icons/ri'
import{MdOutlinePublishedWithChanges} from 'react-icons/md'
import {BsFillArrowDownCircleFill} from 'react-icons/bs'
import {FaFileImport} from 'react-icons/fa'


const AgentFeatures = () => {
  return (

    <>
    
  <div className="features" id='features-link'>
    <h5 className='colored'>Features</h5>
    <div className="card-holder-features">
    
      <div className="cards">
       <FaFileImport className='fea'/>
        <h5>Import Bill</h5>
      </div>
      
      <div className="cards">
      <RiAiGenerate className='fea'/>
        <h5>Upload Bill</h5>
      </div>

      <div className="cards">
       <MdOutlinePublishedWithChanges className='fea'/>
        <h5>Track Bills</h5>
      </div>
      
      
    </div>
  </div>
    
    </>

  )
}

export default AgentFeatures