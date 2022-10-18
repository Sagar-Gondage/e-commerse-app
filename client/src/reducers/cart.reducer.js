import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_T0_LOCAL_STORAGE,
  CART_GET_ITEM_FAIL,
  CART_GET_ITEM_REQUEST,
  CART_GET_ITEM_SUCCESS,
  CART_DELETE_ITEM_FROM_LOCAL_STORAGE,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_UPDATE_ITEM_REQUEST,
  CART_UPDATE_ITEM_SUCCESS,
  CART_CLEAR_FROM_LOCAL_STORAGE,
  CART_GET_LOCAL_STORAGE,
  CART_UPDATE_LOCAL_STORAGE_ITEMS_T0_BACKEND_REQUEST,
  CART_UPDATE_LOCAL_STORAGE_ITEMS_T0_BACKEND_FAIL,
  CART_UPDATE_LOCAL_STORAGE_ITEMS_T0_BACKEND_SUCCESS,
} from "../constants/cart.constants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, updateSuccess: false },
  action
) => {
  console.log("in reducer", state);
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST: {
      return {
        ...state,
        loading: true,
        addProductToBackendSuccess: false,
        error: false,
      };
    }

    case CART_ADD_ITEM_SUCCESS: {
      return {
        ...state,
        loading: false,
        addProductToBackendSuccess: true,
        error: false,
      };
    }

    case CART_ADD_ITEM_FAIL: {
      return { ...state, loading: false, error: true };
    }

    case CART_GET_ITEM_REQUEST: {
      return { ...state, loading: true, error: false };
    }

    case CART_GET_ITEM_SUCCESS: {
      return { ...state, loading: false, cartItems: action.payload };
    }

    case CART_GET_ITEM_FAIL: {
      return { ...state, loading: false, error: true };
    }

    case CART_UPDATE_ITEM_REQUEST: {
      return { ...state, updateSuccess: true };
    }

    case CART_UPDATE_ITEM_SUCCESS: {
      return { ...state, updateSuccess: false };
    }

    case CART_UPDATE_LOCAL_STORAGE_ITEMS_T0_BACKEND_REQUEST: {
      return { ...state, loading: true, error: false };
    }

    case CART_UPDATE_LOCAL_STORAGE_ITEMS_T0_BACKEND_SUCCESS: {
      return { ...state, loading: false, error: false };
    }

    case CART_UPDATE_LOCAL_STORAGE_ITEMS_T0_BACKEND_FAIL: {
      return { ...state, loading: false, error: true };
    }

    case CART_GET_LOCAL_STORAGE: {
      console.log("in action", action.payload);
      return { localStorageCartItems: action.payload };
    }

    case CART_ADD_ITEM_T0_LOCAL_STORAGE: {
      const item = action.payload;
      state.localStorageCartItems = state.localStorageCartItems || [];

      const existItem = state.localStorageCartItems.find(
        (x) => x.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          localStorageCartItems: state.localStorageCartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          localStorageCartItems: [...state.localStorageCartItems, item],
        };
      }
    }

    case CART_DELETE_ITEM_FROM_LOCAL_STORAGE: {
      return {
        ...state,
        localStorageCartItems: state.localStorageCartItems.filter(
          (x) => x.product !== action.payload
        ),
      };
    }

    case CART_CLEAR_FROM_LOCAL_STORAGE: {
      return { localStorageCartItems: [], removeCartSuccess: true };
    }

    case CART_SAVE_SHIPPING_ADDRESS: {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    }

    case CART_SAVE_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    }
    default:
      return state;
  }
};
