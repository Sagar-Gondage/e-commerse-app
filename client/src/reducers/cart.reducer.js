import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cart.constants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST: {
      return { ...state, loading: true, error: false };
      // const item = action.payload;

      // const existItem = state.cartItems.find((x) => x.product === item.product);

      // if (existItem) {
      //   return {
      //     ...state,
      //     cartItems: state.cartItems.map((x) =>
      //       x.product === existItem.product ? item : x
      //     ),
      //   };
      // } else {
      //   return { ...state, cartItems: [...state.cartItems, item] };
      // }
    }

    case CART_ADD_ITEM_SUCCESS: {
      return { ...state, loading: false, error: false };
    }

    case CART_ADD_ITEM_FAIL: {
      return { ...state, loading: false, error: true };
    }

    case CART_REMOVE_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
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
