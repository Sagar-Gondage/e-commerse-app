import axios from "axios";
import {
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_RESET,
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
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/product.constants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST: {
      return { loading: true, products: [] };
    }
    case PRODUCT_LIST_SUCCESS: {
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
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

// create product
export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST: {
      return { ...state, loading: true };
    }
    case PRODUCT_CREATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    }
    case PRODUCT_CREATE_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }
    case PRODUCT_CREATE_RESET: {
      return {};
    }
    default:
      return state;
  }
};

// update product, only admin can update the product
export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST: {
      return { ...state, loading: true };
    }
    case PRODUCT_UPDATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    }
    case PRODUCT_UPDATE_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }
    case PRODUCT_UPDATE_RESET: {
      return { product: {} };
    }

    default:
      return state;
  }
};

// review product
export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST: {
      return { ...state, loading: true };
    }
    case PRODUCT_CREATE_REVIEW_SUCCESS: {
      return {
        ...state,
        loading: false,
        success: true,
      };
    }
    case PRODUCT_CREATE_REVIEW_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }
    case PRODUCT_CREATE_REVIEW_RESET: {
      return {};
    }

    default:
      return state;
  }
};

// review product
export const productTopRatedReducerReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_PRODUCT_TOP_REQUEST: {
      return { ...state, loading: true, products: [] };
    }
    case PRODUCT_PRODUCT_TOP_SUCCESS: {
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    }
    case PRODUCT_PRODUCT_TOP_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const productCategoryListReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_LIST_REQUEST: {
      return { loading: true, products: [] };
    }
    case PRODUCT_CATEGORY_LIST_SUCCESS: {
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    }
    case PRODUCT_CATEGORY_LIST_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export const productFilteredListReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_FILTERED_LIST_REQUEST: {
      return { loading: true, products: [] };
    }
    case PRODUCT_FILTERED_LIST_SUCCESS: {
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    }
    case PRODUCT_FILTERED_LIST_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
};
