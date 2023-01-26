const {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DEATILS_REQUEST ,
  ORDER_DEATILS_SUCCESS ,  ORDER_DEATILS_FAIL, 
  CLEAR_ERRORS,
  ALL_ORDER_DEATILS_REQUEST,
  ALL_ORDER_DEATILS_SUCCESS,
  ALL_ORDER_DEATILS_FAIL,
} = require("../constants/orderConstants");


export const allOrderReducer = (state = {orders:[]}, action) => {
  switch (action.type) {
    case ALL_ORDER_DEATILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case   ALL_ORDER_DEATILS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case ALL_ORDER_DEATILS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }


}







export const orderDetailsReducer = (state = {order:{}}, action) => {
  switch (action.type) {
    case ORDER_DEATILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case   ORDER_DEATILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case ORDER_DEATILS_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }


}





export const myOrdersReducer = (state = {orders:[]}, action) => {
    switch (action.type) {
      case MY_ORDERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case MY_ORDERS_SUCCESS:
        return {
          ...state,
          loading: false,
          orders: action.payload,
        };
      case MY_ORDERS_FAIL:
        return {
          ...state,
          loading: true,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  








export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
