import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartContants";

import axios from "axios";


export const saveShippingInfoAction = (data) => async (dispatch) => {

    dispatch({type:SAVE_SHIPPING_INFO, 
    payload:data
    })

    localStorage.setItem("shippingInfo", JSON.stringify(data));

}







export const removeFromCartAction = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: REMOVE_CART_ITEM,
    payload: {
      product: data.product._id,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const addToCartAction = (id, quantity) => async (dispatch, getState) => {
  // const config = { headers: { "Content-Type": "application/json" } };

  const { data } = await axios.get(`/api/v1/product/${id}`);
  // console.log("datat forn addto cart action", data)
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


