import React from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { listProductsAPI } from "../actions/product.actions";
import HomePageCategories from "../components/HomePageCategories";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Product from "../components/Product";

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const { keyword = "", pageNumber = 1 } = useParams();
  console.log(useParams());
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;
  useEffect(() => {
    dispatch(listProductsAPI("su", pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <div>
      <Link to="/" className="btn btn-light">
        Go Back
      </Link>
      <HomePageCategories />
      <h1>Latest Products</h1>
      {!products?.length && <h2>No Product Found</h2>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.length &&
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
            currentPage={"allproducts"}
          />
        </>
      )}
    </div>
  );
};

export default AllProductsPage;
