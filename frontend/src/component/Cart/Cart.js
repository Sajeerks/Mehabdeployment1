import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { addToCartAction } from "../../actions/cartActions";
import "./cart.css";
import CartCard from "./CartCard.js";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const Cart = () => {
  const dispatch  = useDispatch()
  const {cartItems} = useSelector(state=>state.cart)
  const {isAuthenticated} = useSelector(state=>state.user)
  const navigate = useNavigate()
  const location = useLocation()

  // const masterstate = useSelector(state=>state)
  // console.log("masterstate===", masterstate)

  const increaseQunatity =(id, quantity, stock)=>{
    const newQty = quantity +1
    if(stock <quantity){
      return
    }
    dispatch(addToCartAction(id, newQty))
  }
  const decreaseQunatity =(id, quantity, stock)=>{
    const newQty = quantity -1
    if(newQty <1){
      return
    }
    dispatch(addToCartAction(id, newQty))
  }
  const grossPrice = cartItems.reduce((acc,item)=>item.price*item.quantity +acc ,0)

  const checkOutHandler =()=>{
    // console.log("clickedd checkOutHandler")
  if(!isAuthenticated){
      //  <Navigate to="/login" replace state={{from:location}}/>
        navigate("/login", {state:{from:location.pathname}} )
  }else{
    navigate('/shipping')
  }

  }


  // const item = {
  //   product: "62a481a26e0d8ede3f5e5fab",
  //   price: 200,
  //   name: "mash allah",
  //   image:
  //     "https://media.istockphoto.com/photos/vintage-image-of-a-family-on-the-roads-picture-id1034787020?k=20&m=1034787020&s=612x612&w=0&h=X7TS8pFos4H0VRJi4WxoXyqAPOAjX19Un9pY9t1OVuA=",
  //   quantity: 10,
  // };
  return (
    <Fragment>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
        </div>
        {cartItems &&  cartItems.map(item=>(
             <div className="cardContainer"  key={item.product}>
             <CartCard item={item} />
             <div className="cardInput">
               <button onClick={()=>{decreaseQunatity(item.product, item.quantity, item.stock)}}>-</button>
               <input type="number" readOnly value={item.quantity} />
               <button onClick={()=>{increaseQunatity(item.product, item.quantity, item.stock)}}>+</button>
             </div>
            <p className="cardSubtotal">
             {`$${item.price *item.quantity}`}
   
            </p>
            
           </div>
        ))}
        {(cartItems.length ===0 )&& 
        <div className="emptyCart">
       <RemoveShoppingCartIcon/>
          <p>   your cart is empty </p>
           <Link to="/products"> GO TO Purchase products </Link>
           </div>

          }
        { (cartItems.length !==0 ) && (<div className="cartGrossProfit">
          <div></div>
          <div className="cartGrossProfitBox">
            <p>Gross Total</p>
            <p>{grossPrice}</p>
          </div>
          <div></div>
          <div className="checkOutButton">
            <button onClick={checkOutHandler}>Check Out</button>
          </div>
        </div>)}
        
      
      </div>
    </Fragment>
  );
};

export default Cart;
