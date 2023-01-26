import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_RESET,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  EDIT_PRODUCT_RESET
} from "../constants/productConstants";
import axios from "axios";



export const editProductionAction = (id, product) => async (dispatch) => {
  try {
    dispatch({type:EDIT_PRODUCT_REQUEST})
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    // console.log("product in createNewProductAction---", product)
    console.log("datafromFrondend in editProductionAction---", product)

    for (const pair of product.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    const { data } = await axios.put(`/api/v1/admin/product/${id}`,product, config);
  
     dispatch({
          type: EDIT_PRODUCT_SUCCESS,
          payload: data,
        });
  
    
  } catch (error) {
    console.log("erroro in createNewProductAction",error.response.data.message, )
    dispatch({
      type: EDIT_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }

  
  }











export const createNewProductAction = (product) => async (dispatch) => {
  try {
    dispatch({type:CREATE_PRODUCT_REQUEST})
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    // console.log("product in createNewProductAction---", product)
    console.log("datafromFrondend in createNewProductAction---", product)

    const { data } = await axios.post(`/api/v1/admin/products/new`, product, config);
  
     dispatch({
          type: CREATE_PRODUCT_SUCCESS,
          payload: data,
        });
  
    
  } catch (error) {
    console.log("erroro in createNewProductAction",error.response.data.message, )
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
  
  
  }



export const getAllproductsForAdminAction = () => async (dispatch) => {
try {
  dispatch({type:ADMIN_PRODUCT_REQUEST})
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.get(`/api/v1/admin/products`,  config);

   dispatch({
        type: ADMIN_PRODUCT_SUCCESS,
        payload: data.products,
      });

  
} catch (error) {
  dispatch({
    type: ADMIN_PRODUCT_FAIL,
    payload: error.response.data.message,
  });
}


}





export const createNewProductReviewAction =
  (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
      // console.log("id getProductsDetailsAction", id)
      const config = { headers: { "Content-Type": "application/json" } };
      // console.log("review data in product actions==", reviewData)
      // for (var pair of reviewData.entries()) {
      // console.log("in product actions")
      // console.log(pair[0]+ ', ' + pair[1]);
      // }
      const { data } = await axios.put(`/api/v1/review`, reviewData, config);
      // console.log("id getProductsDetailsAction", id)
      // console.log("id getProductsDetailsAction", data)

      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getProductsDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    // console.log("id getProductsDetailsAction", id)
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.get(`/api/v1/product/${id}`);
    // console.log("id getProductsDetailsAction", id)
    // console.log("id getProductsDetailsAction", data)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProducts =
  (keyword = "", currentpage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    let link = `/api/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
      link = `/api/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      const { data } = await axios.get(link);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// TO CLEAR ALL ERRORS
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
