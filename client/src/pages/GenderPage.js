import React from "react";
import { Col } from "react-bootstrap";
import { Application } from "../components/Categories/Drawer";
import HomePageCategories from "../components/Categories/HomePageCategories";
import Filters from "../components/ProductFilter/Filters";
import ProductCategoryPage from "./ProductCategoryPage";

const GenderPage = () => {
  return (
    <div>
      <HomePageCategories />
      <Application />
      <div className="gender-page">
        <Col md={3} lg={2}>
          <Filters />
        </Col>
        <Col>
          <ProductCategoryPage />
        </Col>
      </div>
    </div>
  );
};

export default GenderPage;
