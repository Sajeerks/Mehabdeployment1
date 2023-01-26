import React from 'react'
import './ContainerLama.css'
import Widget from './Widget'
import ChartLama from './ChartLama'
import FeaturedLama from './FeaturedLama'
import Tablelama from './Tablelama'

const ContainerLama = () => {
  return (
    <div className='coatinerlaaMian'>
       <Widget type="user"/>
       <Widget type="order"/>
       <Widget type="earning"/>
       <Widget type="balance"/>
 
      

 
  <div className='coantieerscond'>

    <FeaturedLama/>
      <ChartLama/>
  </div>

 <div className="tablelamainMina">
 <Tablelama/>
 </div>
      
 
   



    </div>
  )
}

export default ContainerLama