import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cart.constants";
import { instance } from "../defaultURL";

export const addToCartAPI = (newCartItem) => async (dispatch, getState) => {
  dispatch({ type: CART_ADD_ITEM_REQUEST });

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
    console.log(data);
  } catch (error) {}

  // //   console.log("id", id, typeof qty);
  // const { data } = await instance.get(`/api/products/${id}`);

  // dispatch({
  //   type: CART_ADD_ITEM,
  //   payload: {
  //     product: data._id,
  //     name: data.name,
  //     image: data.image,
  //     price: data.price,
  //     countInStock: data.countInStock,
  //     qty,
  //   },
  // });

  // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  // console.log(id);

  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
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
