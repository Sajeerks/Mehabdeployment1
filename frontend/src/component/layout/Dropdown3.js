import React from 'react'
import Dropdown4 from './Dropdown4.js'
import { useState,useRef ,useEffect } from "react";


const Dropdown3 = ({submenu,dropdown ,hider}) => {
 
//   console.log("hider in dropdown33" , hider)
    const depthLevel = 4
//   const [hider22, setHider22] = useState(false)
// setHider22(hider)
    // useEffect(() => {
    //     const handler = (event) => {
    //       console.log( "ref.current",ref.current)
    //       console.log("event.target",event.target)
    //      if (dropdown && ref.current && !ref.current.contains(event.target)) {
    //         setHider22(false);

    //      }
    //     };
    //     document.addEventListener("mousedown", handler);
    //     document.addEventListener("touchstart", handler);
    //     return () => {
    //      // Cleanup the event listener
    //      document.removeEventListener("mousedown", handler);
    //      document.removeEventListener("touchstart", handler);
    //     };
    //    }, []);
       




  return (
 < >
 
 <ul className={` ${hider ? "showside" : "ll"}`} >
    
  <Dropdown4 submenu={submenu} dropdown={dropdown} depthLevel={depthLevel}/>
  </ul>


 </>
  )
}

export default Dropdown3