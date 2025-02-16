import { api } from '../../config/apiConfig';
import { FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS } from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
    console.log("products = ", reqData);
    dispatch({ type: FIND_PRODUCTS_REQUEST })
    const {
        colors,
        sizes,
        minPrice,
        maxPrice,
        minDiscount,
        category,
        stock,
        sort,
        pageNumber,
        pageSize
    } = reqData;
    try {
        const params = {
            color: colors,
            size: sizes,
            minPrice: minPrice,
            maxPrice: maxPrice,
            minDiscount: minDiscount,
            category: category,
            stock: stock,
            sort: sort,
            pageNumber: pageNumber,
            pageSize: pageSize
        };
        console.log("Request Params:", params);

        const { data, status } = await api.get('/api/products', { params });

        console.log("Response Status:", status);
        console.log("products DATA=: ", data);

        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data })
    } catch (error) {
        if (error.response) {
            console.error("Error Response Status:", error.response.status);
            console.error("Error Response Data:", error.response.data);
        } else {
            console.error("Error Message:", error.message);
        }
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message })
    }
}

export const findProductsById = (productId) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST })
    console.log("productId =", productId);
    try {
        const { data } = await api.get(`/api/products/${productId}`)
        console.log("data =", data);

        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        if (error.response) {
            console.error("Error Response Status:", error.response.status);
            console.error("Error Response Data:", error.response.data);
        } else {
            console.error("Error Message:", error.message);
        }
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message })
    }
}