import React from 'react'
import { Routes, Route, Link   ,Outlet} from 'react-router-dom';
import { TextField } from '@mui/material'
import './NavbarLama.css'
import SearchIcon from '@mui/icons-material/Search';
import BoltIcon from '@mui/icons-material/Bolt';
import CloudIcon from '@mui/icons-material/Cloud';
import FestivalIcon from '@mui/icons-material/Festival';
import Avatar from '@mui/material/Avatar';
import GradientIcon from '@mui/icons-material/Gradient';



const NavbarLama = () => {
  return (
    <div className='navbawrlamaMian'>
    <nav  style={{paddingLeft:"1vmax"}}>
    <ul  style={{display:"flex",flexDirection:"row" ,gap:"5vmax" , alignItems:"center",
    justifyContent:"center"
  
  }}>
      <li>
        <Link to="/DashBoardMainLama/users"><span>LIst</span></Link>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </li>
      <li>
        <Link to="/DashBoardMainLama/users/222"><span>user222</span></Link>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </li>
      <li>
        <Link to="/DashBoardMainLama/users/new"><span>new user</span></Link>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </li>
      <li>
        <Link to="/DashBoardMainLama/home"><span>home</span></Link>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </li>
      <li>
        <Link to="/DashBoardMainLama/login"><span>login</span></Link>
        <span></span>
        <span></span>
        <span></span>
        <span></span>

      </li>
    </ul>
  </nav>
    <div className='searchbox'>
       <i><SearchIcon/></i>
      <input type="text" placeholder='search here .... ' className='searhInputNavbar'/>
         
    </div>

   <div className='lastDivInNVabaraCombined'>
      <div className=" itmeNaver itmeNaver1" data-count={66}>
     <BoltIcon/>
      </div>
      <div className="itmeNaver itmeNaver2"data-count="10">
     <CloudIcon/>
      </div>
      <div className="itmeNaver" >
     <FestivalIcon/>
      </div>
      <div className="itmeNaver" >
     <GradientIcon/>
      </div>
      <div className="itmeNaver"data-count="">
     <Avatar sx={{width:30, height:30}}  src="https://images.pexels.com/photos/14396616/pexels-photo-14396616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
      </div>

   </div>





  </div>
  )
}

export default NavbarLama