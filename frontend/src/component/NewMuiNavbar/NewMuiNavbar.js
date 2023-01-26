import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './NewMuiNavbar.css'
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { useAlert } from "react-alert";


const NewMuiNavbar = () => {
  const {isAuthenticated, error, user} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const loginlogoutButtohandler =()=>{
    if(isAuthenticated){
      dispatch(logout())
      navigate("/")
      alert.success("Logout successfully")
    }else{
      navigate("/login")
    }
  }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const open2 = Boolean(anchorEl2);


    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
   
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleCloser = (path) => {
        navigate(path)
      setAnchorEl(null);

      };


    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
      };
    const handleClose2 = () => {
        setAnchorEl2(null);
      };

  
      const handleCloser2 = (path) => {
        navigate(path)
      setAnchorEl2(null);

      };
    const orderITEM = [
        {name:"MY Orders", path:"/myorders"},
        {name:"Confirm order", path:"/confirmorder"},
        {name:"Shipping", path:"/shipping"},
        {name:"cart", path:"/cart"},
    ]

    const productITEM = [
        {name:"Products", path:"/products"},
        {name:"Search", path:"/search"},
      
    ]


  return (
    <Box sx={{ flexGrow: 1, display:"flex" }}>
      <AppBar position="static"  className="menuappbar"  sx={{
       
      // background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(217,87,18,0.9700922605370274) 0%, rgba(229,179,118,0.3958625686602766) 100%, rgba(229,175,122,0.2726132689403886) 100%, rgba(122,235,123,1) 100%)"
      
      
      }}>
        <Toolbar>
            <div>
                  <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
           
            <MenuIcon />
          </IconButton>
            </div>
        

   <div>
    <Typography variant="h6" component="div" sx={{ color:"white", flexGrow: 1,maxWidth:"20%",  }}>
            <Link to="/">Ecommerce</Link>
          </Typography>
   </div>
          

   <Divider orientation="vertical" variant="middle" flexItem sx={{bgcolor:"white",marginLeft:"5px"}}/>
   
        <div>
                 <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        // sx={{position:'static',left:"10%"}}
        className="menubarButton1"
        sx={{
            color:"white"
          }}
      >
        orders
      </Button>
        </div>
        <Divider orientation="vertical" variant="middle" flexItem sx={{bgcolor:"white"}}/>
      <div className="xxxxxxxxxxxxxx">


      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      sx={{
        color:"white"
      }}
      >
        {/* <MenuItem   onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        {orderITEM.map(item=>(
        <MenuItem key={item.path} onClick={e=>handleCloser(item.path)}>{item.name}</MenuItem>

        )
            )}
      </Menu>

      </div>
     






      <div>
                 <Button
        id="basic-button"
        aria-controls={open2 ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open2 ? 'true' : undefined}
        onClick={handleClick2}
        // sx={{position:'static',left:"10%"}}
        className="menubarButton1"
        sx={{
            color:"white"
          }}
      >
        products
      </Button>
        </div>
        <Divider orientation="vertical" variant="middle" flexItem sx={{bgcolor:"white"}}/>
      <div className="xxxxxxxxxxxxxx">


      <Menu
        id="basic-menu"
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      sx={{
        color:"white"
      }}
      >
        {/* <MenuItem   onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        {productITEM.map(item=>(
        <MenuItem key={item.path} onClick={e=>handleCloser2(item.path)}>{item.name}</MenuItem>

        )
            )}
      </Menu>

      
      <Divider orientation="vertical" variant="middle" flexItem sx={{bgcolor:"white"}}/>
      
      <div className="logincompinNavbar"> 
      <Button onClick={loginlogoutButtohandler}>
      <Typography sx={{color:"white", marginLeft:"5px"}}>
            {isAuthenticated?<span>Logout</span>:<span>Login</span>}
          </Typography>
      </Button>

      
    
     
      </div>
      </div>



      



          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NewMuiNavbar;
