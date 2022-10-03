import axios from "axios";
import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/product.constants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST: {
      return { loading: true, products: [] };
    }
    case PRODUCT_LIST_SUCCESS: {
      return { loading: false, products: action.payload };
    }
    case PRODUCT_LIST_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

// single product
// we are setting rewies as an array becaseu in our single product page we have an reviews array
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST: {
      return { ...state, loading: true };
    }
    case PRODUCT_DETAILS_SUCCESS: {
      return { ...state, loading: false, product: action.payload };
    }
    case PRODUCT_DETAILS_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

// single product
// delete product
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST: {
      return { ...state, loading: true };
    }
    case PRODUCT_DELETE_SUCCESS: {
      return { ...state, loading: false, success: true };
    }
    case PRODUCT_DELETE_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
