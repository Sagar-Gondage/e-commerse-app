import React from "react";
import Filters from "../components/ProductFilter/Filters";
import ProductCategoryPage from "./ProductCategoryPage";

const GenderPage = () => {
  return (
    <div>
      <Filters />
      <ProductCategoryPage />
    </div>
  );
};

export default GenderPage;
