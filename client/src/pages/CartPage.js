import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCartAPI } from "../actions/cart.actions";

const CartPage = () => {
  const { id } = useParams();
  const [prdouctId, qty] = id.split("-");

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (prdouctId) {
      dispatch(addToCartAPI(prdouctId, +qty));
    }
  }, [dispatch, prdouctId, +qty]);

  return <div>CartPage</div>;
};

export default CartPage;
