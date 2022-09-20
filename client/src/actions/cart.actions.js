import axios from "axios";
import { CART_ADD_ITEM } from "../constants/cart.constants";

export const addToCartAPI = (id, qty) => async (dispatch, getState) => {
  //   console.log("id", id, typeof qty);
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

  try {
  } catch (error) {}
};
