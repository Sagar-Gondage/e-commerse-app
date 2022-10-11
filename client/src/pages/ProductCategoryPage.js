import React from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFilteredProductsAPI } from "../actions/product.actions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Product from "../components/Product";

const ProductCategoryPage = () => {
  let { keyword: gender, pageNumber = 1 } = useParams();
  const dispatch = useDispatch();

  const productFilteredList = useSelector((state) => state.productFilteredList);
  const { loading, error, products, pages, page } = productFilteredList;

  useEffect(() => {
    console.log(gender, pageNumber);
    dispatch(getFilteredProductsAPI({ gender, pageNumber }));
  }, [dispatch, gender, pageNumber]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
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
