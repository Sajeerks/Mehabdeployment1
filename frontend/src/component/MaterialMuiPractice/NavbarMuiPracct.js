import React from "react";
import AppBar from "@mui/material/AppBar";
import { Badge, Box, Button, Typography, styled } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import DiningIcon from "@mui/icons-material/Dining";
import { InputBase } from "@mui/material";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Avatar from "@mui/material/Avatar";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';


const StyleToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "green",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));
const Icons = styled(Box)(({ theme }) => ({
  // backgroundColor:"white",
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]:{
    display:"flex"
  }
}));
const UserBox = styled(Box)(({ theme }) => ({
  // backgroundColor:"white",
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]:{
    display:"none"
  }
}));

const NavbarMuiPracct = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    console.log({anchorEl})
    const open = Boolean(anchorEl);
    const handleClose=()=>{
        setAnchorEl(null)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
  return (
    <Box sx={{ mt: "4vh" }}>
      <AppBar position="sticky">
        <StyleToolBar>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {" "}
            EAt MUI
          </Typography>
                {/* <Button   onClick={handleClick}>
            Dashboard
            </Button> */}
          <DiningIcon sx={{ display: { xs: "block", sm: "none" } }} />
          <Search>
            <InputBase placeholder="search ... " />
          </Search>
          <Icons>
            <Badge badgeContent={4} color="error">
              <MarkunreadIcon />
            </Badge>

            <Badge badgeContent={2} color="error">
              <NotificationsNoneIcon />
            </Badge>
            <Avatar onClick={handleClick}
              sx={{ width: 30, height: 30 }}
              src="https://images.pexels.com/photos/6608542/pexels-photo-6608542.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            />
          </Icons>
          <UserBox>
          <Typography variant="span"> Sajeer</Typography>
            <Avatar onClick={handleClick}
              sx={{ width: 30, height: 30 }}
              src="https://images.pexels.com/photos/6608542/pexels-photo-6608542.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            />
          </UserBox>
          
      
        </StyleToolBar>
        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // anchorPosition={{ top: 50, left: 50 }}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem >Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem >Logout</MenuItem>
      </Menu>

      </AppBar>
    </Box>
  );
};

export default NavbarMuiPracct;
