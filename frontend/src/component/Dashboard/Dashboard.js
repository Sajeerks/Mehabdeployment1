import "./Dashboard.css";
import React, { Fragment, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userActions";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader.js";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Collapse from "@mui/material/Collapse";
import DraftsIcon from "@mui/icons-material/Drafts";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PaidIcon from '@mui/icons-material/Paid';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Dashboard = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    error,
    isAuthenticated,
    loading,
    user: realuser,
  } = useSelector((state) => state.user);

  const [state, setState] = React.useState({
    // top: false,
    left: false,
    // bottom: false,
    // right: false,
  });

  const [openNest, setopenNest] = React.useState(false);
  const [openSecondNest, setopenSecondNest] = React.useState(false);

  const setnestOpenClicker = (e) => {
    // console.log(e.target)
    // console.log(e.target.current)

    //   setState({ ...state, ["left"]: true });

    // toggleDrawer("left", true)
    // if(state["left"]){
    //     setopenNest(!openNest);
    // }
    setopenNest(!openNest);
  };
const setInsideopenddouble =()=>{
  setopenSecondNest(!openSecondNest);

}
const dataCliker =()=>{
  navigate("/selectedPayments")
}
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const allproducts =()=>{navigate("/products")}  
  const allOrders =()=>{navigate("/allOrders")}  
  const allUses =()=>{navigate("/allUsers")}  
  const paymentInfoaction =()=>{navigate("/paymentInfo")} 
  const returnPaymentHandler =()=>{navigate("/returnPayments")} 
  const productlist =()=>{navigate("/productlists")} 

  const productAntList =()=>{navigate("/productAntList")} 
  const masterAntList =()=>{navigate("/MasterAntList")} 
  const ProductEditableListInAntList =()=>{navigate("/ProductEditableListInAntList")} 
  const Createproduct =()=>{navigate("/Createproduct")} 






   
  

const controlObject= [
    {"title" :"Allprocudts","action":allproducts, "icon":<ProductionQuantityLimitsIcon/>},
    {"title" :"Orders","action":allOrders,"icon":<ShoppingCartCheckoutIcon/>},
    {"title" :"Users","action":allUses, "icon":<PersonSearchIcon/>},
    {"title" :"products List","action":productlist, "icon":<FormatListNumberedRtlIcon/>},
    {"title" :"product List ediable","action":productAntList, "icon":<FormatListNumberedRtlIcon/>},
    {"title" :"MasterAntList","action":masterAntList, "icon":<ShoppingCartCheckoutIcon/>},
    {"title" :"Product AntList","action":ProductEditableListInAntList, "icon":<ProductionQuantityLimitsIcon/>},
    {"title" :"Create Product","action":Createproduct, "icon":<AddCircleOutlineIcon/>},





    {"title" :"PaymentInfo","action":paymentInfoaction,"icon":<PaidIcon/>},


  ]

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {controlObject.map((text, index) => (
          <ListItem key={text.title} disablePadding>
            <ListItemButton onClick={text.action}>

              <ListItemIcon  >
                 {text.icon }
                  </ListItemIcon> 
           
              <ListItemText primary={text.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {["All mail", "Trash", ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <Fragment>
      <div className="dashboardpageMainDiv">
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button className="adimDashBoardButton" onClick={toggleDrawer(anchor, true)}>
              Admin dashboard{" "}
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >

             {  list(anchor)}





              {/* collapsable end*/}

              <List>
                <ListItemButton onClick={setnestOpenClicker}>
                  <ListItemIcon>
                    <ExpandCircleDownIcon name="collpaeer" />
                  </ListItemIcon>
                  <ListItemText primary="Payment Info" />
                  {openNest ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                  

                <Collapse in={openNest} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    
                  
                          <ListItemButton sx={{ pl: 4 }} onClick={returnPaymentHandler}>
                            <ListItemIcon>
                          <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary="return payments" />
                          </ListItemButton>
                        


                    <ListItemButton sx={{ pl: 4 }} onClick={setInsideopenddouble}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Starred" />
                      {openSecondNest ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                      </List>
                </Collapse>
                    <Collapse in={openSecondNest && openNest} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 8 }}  onClick={dataCliker}>
                          <ListItemIcon >
                            <TipsAndUpdatesIcon />
                          </ListItemIcon>
                          <ListItemText primary="Data" />

                        </ListItemButton>
                      </List>
                    </Collapse>
              </List>
              {/* collapsable end*/}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </Fragment>
  );
};

export default Dashboard;
