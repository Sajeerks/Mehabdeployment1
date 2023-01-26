import React, { Fragment } from "react";
import "./ConfirmOrder.css";
import StepLabel from "@mui/material/StepLabel";
import Metadata from "../layout/Metadata/Metadata";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate =useNavigate()
 const location = useLocation()
 const {isAuthenticated} = useSelector(state=>state.user)


  const subTotal = cartItems.reduce((acc, item)=>
   acc+item.quantity*item.price,0);
  const shippingCharges = subTotal>1000?0:30;
  const tax = subTotal*.15;
  const totalPrice = subTotal+shippingCharges+tax;

  const proceedToPayment =()=>{
    const data = {
      subTotal,
      shippingInfo,
      tax,
      totalPrice,
      shippingCharges
    }
    if(!isAuthenticated){
      //  <Navigate to="/login" replace state={{from:location}}/>
        navigate("/login", {state:{from:location.pathname}} )
  }else{
    navigate('/process/payment')
  }

    sessionStorage.setItem("orderInfo",JSON.stringify(data))
    // navigate("/process/payment")
  }

  return (
    <Fragment>
      <Metadata title={"ConfirmOrder"} />

      <div className="confirmOrderPage">
        <CheckoutSteps activeStep={1} />
        <h2 className="confirmorderheading">Confirm Shipping Info</h2>
        <div className="confirmorderDetails">
          <div>
            <p>Name</p>
            <span>{user.name}</span>
          </div>
          <div>
            <p>Phone</p>
            <span>{shippingInfo.phoneNo}</span>
          </div>
          <div id="style-1">
            <p>Address</p>
            <span>
              {shippingInfo.address +
                " ," +
                shippingInfo.city +
                ", " +
                shippingInfo.state +
                ", " + "Pincode: "+shippingInfo.pinCode}
            </span>
          </div>
        </div>
        
        <div className="confirmOrderSecondrow">
          <div className="confirmCartItems" id="style-1">
            <h3>Your cart itmes</h3>
            {cartItems.map((item) => (
              <div key={item.product} className ="confircartitmesingle">
                <img src={item.image} alt="Product" />
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>
                  {item.quantity} X ${item.price} ={" "}
                  <b>${item.price * item.quantity}</b>
                </span>
              </div>
            ))}
          </div>

          <div className="orderSummary">
          <Typography>Order summary</Typography>
            <div className="orderSummaryinsider">
              <div >
                <p>subtotal</p>
                <span>{subTotal}</span>
              </div>
              <div>
                <p>shippingCharges</p>
                <span>{shippingCharges}</span>
              </div>
              <div>
                <p>GST</p>
                <span>${tax}</span>
              </div>
              <div className="orderSummaryTotal">
              <p>
                <b>Total</b>
              </p>
              <span>${totalPrice}</span>
            </div>
            </div>
           
            <button onClick={proceedToPayment}>Proceed to payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
