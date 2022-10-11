import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getFilteredProductsAPI,
  getProductByCategoryAPI,
} from "../actions/product.actions";
import { Application } from "../components/Drawer";
import HomePageCategories from "../components/HomePageCategories";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import Filters from "../components/ProductFilter/Filters";

const ProductCategoryPage = () => {
  let { keyword: gender, pageNumber = 1 } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(false);
  console.log("gender", gender);
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    products: productsCategory,
    pages: pagesCategory,
    page: pageCategory,
  } = productCategoryList;

  const productFilteredList = useSelector((state) => state.productFilteredList);
  const {
    loading: loadingFilter,
    error: errorFilter,
    products,
    pages: pagesFilter,
    page: pageFilter,
  } = productFilteredList;

  let loading = loadingCategory || loadingFilter;
  let error = errorCategory || errorFilter;
  // let products = productsCategory || productsFilter;
  let pages = pagesCategory || pagesFilter;
  let page = pageCategory || pageFilter;

  console.log("cagegoryProducts", productsCategory);
  console.log("filteredProducts", products);

  useEffect(() => {
    console.log(gender, pageNumber);
    // dispatch(getFilteredProductsAPI({ gender, pageNumber }));
    if (gender === "allproducts") {
      setCurrentPage(true);
    } else {
      setCurrentPage(false);
    }
  }, [dispatch, gender, pageNumber]);

  //   console.log("ProductCategoryPageData", products);
  // console.log("curr", currentPage);
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
            <Col sm={12} md={3}>
              <Filters currentPage={currentPage} />
            </Col>
            <Col>
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
            </Col>
          </Row>
          <Paginate pages={pages} page={page} keyword={gender ? gender : ""} />
        </>
      )}
    </>
  );
};

export default ProductCategoryPage;
