import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createProductsReducer,
  editProductReducer,
  getAdminAllProductsReducer,
  newProductReviewReducer,
  productReducer,
  productsDetailsReducer,
} from "./reducers/productReducer";
import {
  userReducer,
  updateUserReducer,
  forgotPasswordReducer,
  allUsersReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrderReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  product: productsDetailsReducer,
  user: userReducer,
  userUpdater: updateUserReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  order:newOrderReducer, 
  myOrders:myOrdersReducer,
  singleOrder:orderDetailsReducer,
  newReview:newProductReviewReducer,
  allOrders:allOrderReducer,
  allUsers:allUsersReducer,
  adminAllProducts:getAdminAllProductsReducer,
  createSingleNewProduct:createProductsReducer,
  editSingleProduct:editProductReducer,
});
let intialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
          shippingInfo: localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem("shippingInfo"))
          :{},
  },
};
const middleWare = [thunk];
const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
