import { useState } from "react";
import Dropdown2 from "./Dropdown2";


const Dropdown = ({ submenus, dropdown, depthLevel }) => {
       const depthLevel2 = depthLevel+1
    return (
     <ul className={`dropdown ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (

     
        
           <Dropdown2  key={index}  dropdown={dropdown} submenu={submenu} depthLevel ={depthLevel2} />
        
 
        //     <li key={index} className="menu-items22">
        //     <a href={`${submenu.title}`}>{submenu.title}</a>
        //    </li> 
        

    
      ))}
     </ul>
    );
   };
   
   export default Dropdown;