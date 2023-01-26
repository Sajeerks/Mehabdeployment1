import React, { Fragment, useState } from 'react'
import './UserOptions.css'
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { Hidden, Typography } from '@mui/material';
import profiepic from "../../images/Profile.png"
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {useNavigate} from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';

import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { AiOutlineRotateRight } from 'react-icons/ai';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Popover from '@mui/material/Popover';
import Badge from '@mui/material/Badge';

const UserOptions = ({user}) => {
  
    const {cartItems} = useSelector(state=>state.cart)
   
 const totalItmeInCart =cartItems.length
     

    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
   const dispatch =   useDispatch()
    const alert = useAlert()
    const orders = ()=>{
      navigate("/orders")
    }
    const dashboard = ()=>{
      navigate("/dashboard")
    }
    const account = ()=>{
      navigate("/account")
    }
    const logoutUser = ()=>{
   
      dispatch(logout())
      navigate("/")
      alert.success("Logout successfully ")
    }
    const gotoCart = ()=>{
      navigate("/cart")
    }
  
    const actions = [
      { icon: <ListAltIcon     />, name: 'Orders' ,func:orders },
      { icon: <PersonIcon />, name: 'Profile' , func:account },
      { icon: <ShoppingCartIcon style={{color:cartItems.length>0?"tomato":"unset"}} />, name: 'Cart', func:gotoCart },

      { icon: <ExitToAppIcon />, name: 'Logout', func:logoutUser },
    ];
    if(user && user.role ==="admin"){
      actions.unshift( { icon: <DashboardIcon />, name: 'Dashboard' ,func:dashboard })
    }


    
    
  return (
    <Fragment>
  <Backdrop       open={open}  />
  <Badge badgeContent={totalItmeInCart} color="secondary" className={totalItmeInCart>0? 'badgerclass':"badgerNone"}

  >
  </Badge>

  <SpeedDial
  // data-content={totalItmeInCart}
      ariaLabel="SpeedDial basic example"
      onOpen={()=>setOpen(true)}
      onClose={()=>setOpen(false)}

      sx={{ position: 'fixed', top: 5, right: 16 , overflow:"hidden",}}
          direction ="down"
      className ="speedclass"
      icon={ <img
       className='speedDialIcon'
       src={user && user.avatar.url?user.avatar.url:profiepic}
       alt="profile-Pic"
      />
      }
      >
{actions.map((action) => (
          <SpeedDialAction
          id="kkpathi"
          sx={{	zIndex:6000,bgcolor:"yellow",color:"green", border:"1px solid green"}}
          className="speedAction judo"
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick ={action.func}

            
          />
        ))}




</SpeedDial>

    </Fragment>
  
  )
}


// document.getElementById('kkpathi')?.addEventListener('mouseover', (e) => {
//   // load the linked content optimistically before click
//   console.log("mouseover", e)
// })


// document.addEventListener('DOMContentLoaded', () => {
//   const pointerFineSupported = window.matchMedia('(pointer: fine)').matches

//   // document.getElementById('footer').addEventListener('hover', (e) => {
//   //   // load the linked content optimistically before click
//   //   console.log("hover", e)
//   // })
//   // document.getElementById('footer').addEventListener('click', (e) => {
//   //   // load the linked content optimistically before click
//   //   console.log("click", e)
//   // })


//   if (pointerFineSupported) {
//     document.querySelector('speedAction')?.addEventListener('hover', (e) => {
//       // load the linked content optimistically before click
//       console.log("hover", e)
// 	})
// 	document.querySelector('speedAction')?.addEventListener('mouseenter', (e) => {
//       // show the related caption
//       window.alert("mouseenter")
// 	})
//     document.querySelector('speedAction')?.addEventListener('mouseleave', (e) => {
//       // hide the related caption
//       window.alert("mouseleave")

// 	})
//   }
// });










export default UserOptions