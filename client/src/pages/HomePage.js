import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProudcts = async () => {
      let { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    };
    fetchProudcts();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomePage;
