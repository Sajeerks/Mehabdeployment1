import axios from "axios";

const {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DEATILS_REQUEST,
  ORDER_DEATILS_SUCCESS,
  ORDER_DEATILS_FAIL,
  ALL_ORDER_DEATILS_REQUEST,
  ALL_ORDER_DEATILS_SUCCESS,
  ALL_ORDER_DEATILS_FAIL,
  CLEAR_ERRORS,
} = require("../constants/orderConstants");



export const getAllOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_ORDER_DEATILS_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    // console.log("order form orderActin ", order)
    // console.log("datata form getOrderDetailsAction id ", id)

    const { data } = await axios.get(`/api/v1/allOrders`, config);
    //  console.log("datata form getOrderDetailsAction ", data)
    dispatch({ type: ALL_ORDER_DEATILS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_DEATILS_FAIL,
      payload: error.resposne.data.message,
    });
  }
};








export const getOrderDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DEATILS_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    // console.log("order form orderActin ", order)
    // console.log("datata form getOrderDetailsAction id ", id)

    const { data } = await axios.get(`/api/v1/order/${id}`, config);
    //  console.log("datata form getOrderDetailsAction ", data)
    dispatch({ type: ORDER_DEATILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DEATILS_FAIL,
      payload: error.resposne.data.message,
    });
  }
};

export const myOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    // console.log("order form orderActin ", order)

    const { data } = await axios.get("/api/v1/orders/me", config);
    //  console.log("datata form myOrdersAction ", data)
    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: MY_ORDERS_FAIL, payload: error.resposne.data.message });
  }
};

export const createNewOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    console.log("order form orderActin ", order);

    const { data } = await axios.post("/api/v1/order/new", order, config);
    console.log("datata form orderActin ", data);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.resposne.data.message });
  }
};

// TO CLEAR ALL ERRORS
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
