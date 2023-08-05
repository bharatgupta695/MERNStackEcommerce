import axios from 'axios';

import { 
    ALL_PRODUCT_REQUEST,
     ALL_PRODUCT_SUCCESS,
      ALL_PRODUCT_FAIL,
      PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS,
            PRODUCT_DETAILS_FAIL,
       CLEAR_ERRORS } 
      from "../constants/productConstants";


// Get all products
export const getProducts = (keyword= "",currentPage=1,price=[0,250000],category,ratings=0) => async (dispatch) => {
    try{
        dispatch({ type: ALL_PRODUCT_REQUEST });
let link=`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`  ;
         if(category){
            console.log(category,"here are category");
link=`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
         }
         const { data } = await axios.get(link);
         console.log(keyword,"here are products");
         dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });

    }catch(error){
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }
}

// Get  product details
export const getProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
         // console.log(data,"here  are are products");
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}