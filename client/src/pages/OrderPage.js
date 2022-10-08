import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  deliverOrderAPI,
  getOrderDetailsAPI,
  listOrdersAPI,
  payOrderAPI,
} from "../actions/order.actions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/order.constants";
import { instance } from "../defaultURL";

const OrderPage = () => {
  const [loadingRazorpay, setLoadingRazorPay] = useState(false);
  const [orderAmount, setOrderAmount] = useState(false);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (!order || successPay || order._id !== orderId || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetailsAPI(orderId));
    }
  }, [dispatch, orderId, successPay, order, successDeliver]);

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      const postConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const getConfig = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      try {
        setLoadingRazorPay(true);
        // console.log("in try");
        const result = await instance.post(
          "/api/razorpay/create-order",
          {
            amount: order.totalPrice + "00",
          },
          postConfig
        );
        // console.log("orderCreated", result);
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await instance.get("/api/razorpay/get-razorpay-key", getConfig);

        // console.log("key", razorpayKey);
        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: "example name",
          description: "example transaction",
          order_id: order_id,
          handler: async function (response) {
            const result = await instance.post(
              "/api/razorpay/pay-order",
              {
                amount: amount,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              },
              postConfig
            );
            // alert(result.data.msg);
            const paymentResult = {
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
            // console.log("result", result);
            dispatch(payOrderAPI(orderId, paymentResult));
            // fetchOrders();
          },
          prefill: {
            name: "example name",
            email: "email@example.com",
            contact: "111111",
          },
          notes: {
            address: "example address",
          },
          theme: {
            color: "#80c0f0",
          },
        };

        setLoadingRazorPay(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        // console.log("Error", err);
        setLoadingRazorPay(false);
      }
    };
    document.body.appendChild(script);
  };

  const deliverHandler = () => {
    dispatch(deliverOrderAPI(order));
    // calling list order api here. i dont know why i am not able to get the updated list order when i get redirected to orderlist page even when i have all the dependancies there. so i am calling orderlist here so when i redircted to orderlist i will have updated orderlist alredy.
    dispatch(listOrdersAPI());
    navigate("/admin/orderlist");
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <Row>
                <Col>
                  <strong>Name: </strong> {order.user.name}
                </Col>
                <Col>
                  <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
                </Col>
              </Row>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Paid On {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid On {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <strong>Method: </strong>
              {order.orderItems.length === 0 ? (
                <Message>Order Is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹ {item.price} = ₹{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹ {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹ {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹ {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {/* {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )} */}
                  <Button onClick={loadRazorpay}>Pay</Button>
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin === "true" &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
