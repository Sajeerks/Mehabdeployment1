import Dropdown from "./Dropdown";
import { useState,useRef ,useEffect } from "react";
import { Link } from "react-router-dom";


const MenuItems = ({ items ,depthLevel }) => {
    const [dropdown, setDropdown] = useState(false);
     const depthLevel1 = depthLevel+1
     let ref = useRef();


     useEffect(() => {
      const handler = (event) => {
        // console.log( "ref.current",ref.current)
        // console.log("event.target",event.target)
       if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
       }
      };
      document.addEventListener("mousedown", handler);
      document.addEventListener("touchstart", handler);
      return () => {
       // Cleanup the event listener
       document.removeEventListener("mousedown", handler);
       document.removeEventListener("touchstart", handler);
      };
     }, [dropdown]);
     




  
 return (
  
  <li className="menu-items" ref={ref}>
   {items.submenu ? (
    <>
     <button type="button"   className="spreaderButton"    aria-expanded={dropdown ? "true" : "false"}
      onClick={() => setDropdown((prev) => !prev )} 
        >
      {items.title}{" "}
      {depthLevel1 > 0 ? <span>&raquo;</span> : <span className="arrow" />}
     </button> 
     
     <Dropdown submenus={items.submenu} dropdown={dropdown}  depthLevel={depthLevel1}/>
     
    </>
   ) : (
  
  <Link to ={`${items.title}`}>{items.title}</Link>
   )}

  </li>

 );
};

export default MenuItems;