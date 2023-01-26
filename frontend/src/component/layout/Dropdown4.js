import React from 'react'
import { Link } from 'react-router-dom'

const Dropdown4 = ({submenu}) => {
    // console.log("subment i n dropdown4",submenu)
  return (
   <>
  { submenu.map(val=>(
    <li  className="menuleve4" key={val.title}>

   <Link to={`${val.title}`}>{`${val.title}`}</Link>

       </li>  
  ))}
   
      
   </>

  )
}

export default Dropdown4