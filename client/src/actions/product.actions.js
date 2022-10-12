import axios from "axios";
import {
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_FILTERED_LIST_FAIL,
  PRODUCT_FILTERED_LIST_REQUEST,
  PRODUCT_FILTERED_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_PRODUCT_TOP_FAIL,
  PRODUCT_PRODUCT_TOP_REQUEST,
  PRODUCT_PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/product.constants";
import { instance } from "../defaultURL";
// const instance = axios.create();

export const listProductsAPI =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    // console.log("in d", keyword, pageNumber);
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await instance.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      // console.log("data", data);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      // console.log("in error", error);
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// listProductsAPI
export const getProductByCategoryAPI =
  (keyword = "", pageNumber = 1) =>
  async (dispatch) => {
    // console.log("in Action keyword", keyword, pageNumber);
    try {
      dispatch({ type: PRODUCT_CATEGORY_LIST_REQUEST });
      const { data } = await instance.get(
        `/api/products/product?productcategory=${keyword}&pageNumber=${pageNumber}`
      );
      // console.log("data", data);
      dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
      // console.log("in error", error);
      dispatch({
        type: PRODUCT_CATEGORY_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// get single proudct
export const getSingleProductAPI = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await instance.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// delete product
export const deleteProductAPI = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await instance.delete(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// create product
export const createProductAPI = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await instance.post(`/api/products`, {}, config);

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// update product
export const updateProductAPI = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await instance.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// review create product
export const createProductReviewAPI =
  (productId, review) => async (dispatch, getState) => {
    // console.log("review", review);
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await instance.post(`/api/products/${productId}/reviews`, review, config);

      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// top products for carousol
export const listTopProductsAPI = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_PRODUCT_TOP_REQUEST });
    const { data } = await instance.get(`/api/products/top`);
    dispatch({ type: PRODUCT_PRODUCT_TOP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFilteredProductsAPI =
  (body = {}) =>
  async (dispatch) => {
    // const config = {
    //   headers: {
    //     Accept: "*/*",
    //     "Content-Type": "application/json",
    //   },
    // };
    // try {
    //   const { data } = await instance.post(
    //     "api/products/getproducts/api",
    //     body,
    //     config
    //   );
    //   dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
    //   // console.log("reqMade");
    //   // console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }

    console.log("bodyin filteredProudcts api", body);
    try {
      dispatch({ type: PRODUCT_FILTERED_LIST_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await instance.post(
        "/api/products/getproducts/api",
        body,
        config
      );
      console.log("data", data);
      dispatch({ type: PRODUCT_FILTERED_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_FILTERED_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
