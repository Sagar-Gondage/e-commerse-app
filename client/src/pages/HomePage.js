import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProductsAPI } from "../actions/product.actions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import PlacementExample from "../components/Message";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProductsAPI(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h1>Latest Products</h1>
      {!products.length && <h2>No Product Found</h2>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomePage;
