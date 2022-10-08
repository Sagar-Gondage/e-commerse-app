import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Card, Container } from "react-bootstrap";
import Product from "../components/Product";
import { listProductsAPI } from "../actions/product.actions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import PlacementExample from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import HomePageCategories from "../components/HomePageCategories";
import { Application, ApplicationDrawer } from "../components/Drawer";

const HomePage = () => {
  // console.log("in homepage");
  const dispatch = useDispatch();
  const { keyword, pageNumber = 1 } = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    // console.log("in home dispatch");
    dispatch(listProductsAPI(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  // console.log("Home", products);
  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <ProductCarousel />
          <HomePageCategories />
          {/* <ApplicationDrawer /> */}
          <Application />
        </>
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {!products?.length && <h2>No Product Found</h2>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products &&
              products.length &&
              products.map((product) => {
                return (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                );
              })}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
