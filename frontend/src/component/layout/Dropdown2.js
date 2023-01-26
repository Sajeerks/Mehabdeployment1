import React from 'react'
import Dropdown3 from './Dropdown3.js'
import { useState } from "react";
import { Link } from 'react-router-dom';

const Dropdown2 = ( {depthLevel,submenu , dropdown}) => {
    // console.log("subment", submenu.title)
    // console.log("submee", submenu.submenu2)
  const [hider, setHider] = useState(false)

  return (
    
  <>

{submenu.submenu2?(<>
 
  <li  className="menu-items22  deeper"   >
   
   {/* <a href={`${submenu.title}`}> */}
     <div onClick={() => setHider((prev) => !prev )}  >
     <span     > {submenu.title} &raquo;</span>
     <Dropdown3  submenu={submenu.submenu2 } dropdown={dropdown} hider={hider} />
     </div>
   {/* </a> */}
       </li>  

     
 </>):(<>

 
   <li  className="menu-items22">

   <Link to={`${submenu.title}`}>{submenu.title}</Link>
       </li>  
      
         </>)  }

  </>

   


    // <li  className="menu-items22">
    // <a href={`${submenu.title}`}>{submenu.title}</a>
    //    </li>  
        
    
  )
}

export default Dropdown2