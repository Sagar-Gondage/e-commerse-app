import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  addCartToLocalStorage,
  addToCartAPI,
  clearCartFromLocalStorage,
  deleteCartItemFromLocalStorage,
  getCartItemsAPI,
  getLocalStorageCartItems,
  removeFromCart,
  updateCartItemsAPI,
  updateLocalStorageCartToBackend,
} from "../actions/cart.actions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CartPage = () => {
  const { id } = useParams();
  let productId;
  let qty;
  if (id) {
    [productId, qty] = id.split("-");
  }

  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const {
    cartItems: apiCartProducts,
    updateSuccess,
    addProductToBackendSuccess,
    localStorageCartItems,
    loading,
    removeCartSuccess,
  } = cart;

  // console.log("cart", cart);

  const { userInfo } = useSelector((state) => state.userLogin);

  // useEffect(() => {
  //   console.log("in use");
  //   console.log(updateSuccess);
  //   // dispatch(getCartItemsAPI());
  // }, [productId]);

  useEffect(() => {
    if (userInfo) {
      if (localStorageCartItems?.length) {
        // console.log("added to backend");
        // for (let i = 0; i < localStorageCartItems.length; i++) {
        dispatch(addToCartAPI(localStorageCartItems));
        // }
        // console.log("update to backend");

        // for (let i = 0; i < localStorageCartItems.length; i++) {
        //   const { qty, product } = localStorageCartItems[i];
        // dispatch(updateLocalStorageCartToBackend(localStorageCartItems));
        // }
      }
      // console.log("get cart Items");
      dispatch(getCartItemsAPI());
      // console.log("cleat cart from local storage");
      if (localStorageCartItems?.length) {
        dispatch(clearCartFromLocalStorage());
      }
    } else if (userInfo) {
      dispatch(clearCartFromLocalStorage());
    } else if (updateSuccess) {
      dispatch(getCartItemsAPI());
    } else {
      // console.log("in else of use Effect");
      dispatch(getLocalStorageCartItems());
    }
    if (addProductToBackendSuccess) {
      dispatch(getCartItemsAPI());
    }

    // return () => {
    //   console.log("in dispatch aaaaa");
    //   if (!userInfo) {
    //     dispatch(getLocalStorageCartItems());
    //   }
    // };
  }, [updateSuccess, userInfo, dispatch, addProductToBackendSuccess]);

  useEffect(() => {
    // console.log("in set cart products to array");
    if (apiCartProducts) {
      setCartItems(apiCartProducts);
    } else if (localStorageCartItems && localStorageCartItems.length) {
      setCartItems(localStorageCartItems);
    }
  }, [apiCartProducts, localStorageCartItems]);

  // console.log("cI", cartItems);

  const removeFromCartHandler = (id) => {
    if (!userInfo) {
      // dispatch(addCartToLocalStorage(productId, qty));
      alert("add to local");
    } else {
      // dispatch(addToCartAPI(newCartItem));
      alert("add to backend");
    }
    // dispatch(deleteCartItemFromLocalStorage(id));
  };

  const checkoutHanlder = () => {
    // console.log("in cart");r
    // navigate(`/login?redirect=shipping`);
    navigate(`/shipping`);
  };

  const handleOnCountChange = (value, item) => {
    // console.log(value, item.product);
    console.log(item);
    if (!userInfo) {
      dispatch(addCartToLocalStorage(item.product, value));
    } else {
      // console.log("in udc");
      item.qty = value;
      // console.log(item);
      dispatch(updateCartItemsAPI([item]));
    }
  };

  return (
    <Row>
      <ToastContainer />
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems?.length === 0 ? (
          <Message>
            Your Cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {loading ? (
              <Loader />
            ) : updateSuccess ? (
              <Loader />
            ) : (
              cartItems?.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/product/${item.product}`}
                        className="router-link"
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={3}>
                      <Form.Select
                        value={item.qty}
                        onChange={(e) =>
                          handleOnCountChange(e.target.value, item)
                        }
                      >
                        {[...Array(5).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems?.reduce((sum, el) => (sum += el.qty), 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((sum, el) => (sum += el.qty * el.price), 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item className="d-grid ">
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHanlder}
              >
                Go To CheckOut
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartPage;
