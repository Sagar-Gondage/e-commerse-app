import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductAPI } from "../actions/product.action";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductPage = () => {
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
    },
    error,
  } = productDetails;
  let { id: ProductId } = useParams();

  useEffect(() => {
    dispatch(getSingleProductAPI(ProductId));
  }, [dispatch]);

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
                    <Col>{countInStock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="d-grid ">
                  <Button
                    className="btn rounded"
                    type="button"
                    disabled={countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductPage;
