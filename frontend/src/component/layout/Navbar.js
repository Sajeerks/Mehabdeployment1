import React from "react";
import { Link } from "react-router-dom";
import { menuItems } from "./menuItems";
import MenuItems from "./sub";
import logo from '../../images/logo.png'

const Navbar = () => {
    const depthLevel = 0;
  return (
    <nav>
      <div   className="wholeNav">
         <div id="kk" >
            
          
   <Link to="/">
        <img src={logo} alt="logo" />
    
    </Link>

             
            </div>
         
        <ul className="menus">
     
           
          {menuItems.map((menu, index) => {
            return (
              
                <MenuItems items={menu} key={index} depthLevel={depthLevel}  />
            //   <li className="menu-items" key={index}>
            //     <a href="/#">{menu.title}</a>
            //   </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
