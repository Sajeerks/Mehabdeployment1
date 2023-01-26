import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartContants";

export const cartReducer = (state = { cartItems: [] , shippingInfo:{}}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        // console.log("state in cartreducer -inside if {...state}--",{...state})
        // console.log("state in cartreducer -inside if --",state)

        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        // console.log("state in cartreducer ---",state)
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      const removeItem = action.payload;
      // console.log(" removeItem--",removeItem)
      // console.log("filered cartiemds",[...state.cartItems.filter(i=>i.product !== removeItem.product)])
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter((i) => i.product !== removeItem.product),
        ],
      };
    
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo:action.payload
      }

    default:
      return {
        ...state,
      };
  }
};
