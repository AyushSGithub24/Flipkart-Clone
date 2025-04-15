import * as actionTypes from '../constants/productConstant';

const url=import.meta.env.VITE_API_BASE_URL;

export const getProducts = () => async (dispatch) => {
    try {
        const response = await fetch(url+`/product`);
        const data = await response.json();
        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.message });
    }
};
