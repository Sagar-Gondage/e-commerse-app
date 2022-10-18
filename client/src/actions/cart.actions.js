import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_T0_LOCAL_STORAGE,
  CART_GET_ITEM_FAIL,
  CART_GET_ITEM_REQUEST,
  CART_GET_ITEM_SUCCESS,
  CART_DELETE_ITEM_FROM_LOCAL_STORAGE,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_UPDATE_ITEM_FAIL,
  CART_UPDATE_ITEM_REQUEST,
  CART_UPDATE_ITEM_SUCCESS,
  CART_CLEAR_FROM_LOCAL_STORAGE,
  CART_GET_LOCAL_STORAGE,
  CART_UPDATE_LOCAL_STORAGE_ITEMS_T0_BACKEND_REQUEST,
  CART_UPDATE_LOCAL_STORAGE_ITEMS_T0_BACKEND_SUCCESS,
  CART_UPDATE_LOCAL_STORAGE_ITEMS_T0_BACKEND_FAIL,
} from "../constants/cart.constants";
import { instance } from "../defaultURL";

export const addToCartAPI = (newCartItem) => async (dispatch, getState) => {
  dispatch({ type: CART_ADD_ITEM_REQUEST });
  // console.log("in add to Cart");
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await instance.post("/api/cart", newCartItem, config);
    dispatch({ type: CART_ADD_ITEM_SUCCESS });
    // console.log(data);
  } catch (error) {}
};

export const addCartToLocalStorage =
  (id, qty) => async (dispatch, getState) => {
    console.log("id", id, typeof qty);

    const { data } = await instance.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM_T0_LOCAL_STORAGE,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.localStorageCartItems)
    );
    // console.log("productset");
  };

export const getLocalStorageCartItems = () => (dispatch) => {
  const localStorageCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  // console.log("localStorageCart", localStorageCart);
  dispatch({ type: CART_GET_LOCAL_STORAGE, payload: localStorageCart });
};

export const getCartItemsAPI = () => async (dispatch, getState) => {
  dispatch({ type: CART_GET_ITEM_REQUEST });

  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // console.log("in get Items api");

    const { data } = await instance.get("/api/cart", config);
    // console.log("userCartdata", data);
    dispatch({ type: CART_GET_ITEM_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: CART_GET_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCartItemsAPI =
  (newProduct) => async (dispatch, getState) => {
    dispatch({ type: CART_UPDATE_ITEM_REQUEST });
    // console.log("newProduct", newProduct);
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // console.log("in try");

      const { data } = await instance.put("/api/cart", newProduct, config);
      // console.log("putReqCartdata", data);

      // getCartItemsAPI();
      // console.log("get cart items called");
      dispatch({ type: CART_UPDATE_ITEM_SUCCESS });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: CART_UPDATE_ITEM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateLocalStorageCartToBackend =
  (newProduct) => async (dispatch, getState) => {
    dispatch({ type: CART_UPDATE_LOCAL_STORAGE_ITEMS_T0_BACKEND_REQUEST });
    // console.log("in update local to backed");
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // console.log("in try");

      const { data } = await instance.put("/api/cart", newProduct, config);
      // console.log("putReqCartdata", data);
      // getCartItemsAPI();
      // console.log("get cart items called");
      dispatch({ type: CART_UPDATE_LOCAL_STORAGE_ITEMS_T0_BACKEND_SUCCESS });
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: CART_UPDATE_LOCAL_STORAGE_ITEMS_T0_BACKEND_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteCartItemFromLocalStorage = (id) => (dispatch, getState) => {
  // console.log(id);

  dispatch({ type: CART_DELETE_ITEM_FROM_LOCAL_STORAGE, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCartFromLocalStorage = () => (dispatch) => {
  // console.log("in delete");
  if (localStorage.getItem("cartItems")) {
    // console.log("in true");
    localStorage.removeItem("cartItems");
  }
  dispatch({ type: CART_CLEAR_FROM_LOCAL_STORAGE });
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// savePaymentMethod
// Payment Method
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
