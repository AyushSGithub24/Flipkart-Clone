import * as actionTypes from '../constants/productConstant';

const URL = "http://localhost:3000";

export const getProducts = () => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:3000/product`);
        const data = await response.json();
        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.message });
    }
};
