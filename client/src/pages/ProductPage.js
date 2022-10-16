import React, { useEffect, useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReviewAPI,
  getSingleProductAPI,
} from "../actions/product.actions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import PlacementExample from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/product.constants";
import Meta from "../components/Meta";
import { instance } from "../defaultURL";
import { addToCartAPI } from "../actions/cart.actions";

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [productRating, setProductRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const {
    loading,
    product: {
      image,
      name,
      rating,
      numReviews,
      price,
      description,
      countInStock,
      reviews,
    },
    error,
  } = productDetails;
  let { id: productId } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // console.log(userInfo)

  const proudctReviewCreate = useSelector((state) => state.proudctReviewCreate);
  const { error: errorProductReview, success: successProductReview } =
    proudctReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setProductRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(getSingleProductAPI(productId));
  }, [dispatch, successProductReview, productId]);

  const addToCartHandler = async () => {
    const newCartItem = {
      name,
      qty,
      image,
      price,
      product: productId,
    };
    dispatch(addToCartAPI(newCartItem));
    // navigate(`/cart/${productId}-${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReviewAPI(productId, { rating: productRating, comment })
    );
  };
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={name} />
          <Row>
            <Col md={6}>
              {/* fluid keeps image inside the container */}
              <Image src={image} alt={name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={rating} text={`${numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${price}</ListGroup.Item>
                <ListGroup.Item>: ${description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>{price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Select
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className="d-grid ">
                    <Button
                      className="btn rounded"
                      type="button"
                      disabled={countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <h2>Reviews</h2>
              {reviews.length === 0 && <Message>No Review</Message>}
              <ListGroup variant="flush">
                {reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={productRating}
                          onChange={(e) => setProductRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </Form.Group>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">Login In</Link>
                      <span> </span>to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductPage;
