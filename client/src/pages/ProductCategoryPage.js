import React from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductByCategoryAPI } from "../actions/product.actions";
import { Application } from "../components/Drawer";
import HomePageCategories from "../components/HomePageCategories";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Product from "../components/Product";

const ProductCategoryPage = () => {
  let { keyword, pageNumber } = useParams();
  const dispatch = useDispatch();
  console.log("keyword", keyword);
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { loading, error, products, pages, page } = productCategoryList;

  useEffect(() => {
    dispatch(getProductByCategoryAPI(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  console.log("ProductCategoryPageData", products);

  return (
    <>
      <HomePageCategories />
      <Application />
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

export default ProductCategoryPage;
