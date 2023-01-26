import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './CartCard.css'
import { useDispatch, useSelector } from "react-redux";
import { removeFromCartAction } from "../../actions/cartActions";

const CartCard = ({item}) => {
  const dispatch  = useDispatch()
  const {cartItems} = useSelector(state=>state.cart)


  const removeFromTheCart =(id)=>{
    // console.log("cicked inside the cart card")
   dispatch(removeFromCartAction(id))
   
  }
  return (
    <Fragment>
    <div className='cartItemcard'>
        <img src={item.image} alt="sample image"/>

        <div className='cardItemLinker' >
            <Link  to={`/product/${item.product}`}>{item.name}</Link>
            <span className='cartItemspan'>{`Price :₹ ${item.price}`}</span>
            <p onClick={()=>removeFromTheCart(item.product)}>Remove</p>
        </div>


    </div>
    </Fragment>
  )
}

export default CartCard