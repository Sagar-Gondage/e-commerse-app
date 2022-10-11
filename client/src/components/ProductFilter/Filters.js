import React, { useState } from "react";
import { useEffect } from "react";
import { Accordion, Form, InputGroup, Row, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProductsAPI } from "../../actions/product.actions";
import LaptopViewFilters from "./LaptopViewFilters";
import MobileViewFilters from "./MobileViewFilters";

const Filters = ({ setFilteredState }) => {
  const [filterPrice, setFilterPrice] = useState({});
  const [filterGender, setFilterGender] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterSize, setFilterSize] = useState([]);
  const [filterColor, setFilterColor] = useState([]);
  const [priceState, setPriceState] = useState(false);

  // const [allState, setAllState] = useState({
  //   gender: false,
  //   size: false,
  //   category: false,
  //   color: false,
  // });

  // const [prevState, setPrevState] = useState("");

  // const { gender, size, category, color } = allState;

  const [gender, setGender] = useState(false);
  const [size, setSize] = useState(false);
  const [category, setCategory] = useState(false);
  const [color, setColor] = useState(false);

  const dispatch = useDispatch();

  const productCategoryList = useSelector((state) => state.productCategoryList);

  const { products } = productCategoryList;

  return (
    <>
      <MobileViewFilters />
      <LaptopViewFilters />
    </>
  );
};

export default Filters;
