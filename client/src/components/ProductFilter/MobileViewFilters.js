import React, { useState } from "react";
import { useEffect } from "react";
import { Accordion, Form, InputGroup, Row, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProductsAPI } from "../../actions/product.actions";

import styled from "styled-components";
import { useParams } from "react-router-dom";

const MobileViewFilters = () => {
  const [filterPrice, setFilterPrice] = useState({});
  const [filterGender, setFilterGender] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterSize, setFilterSize] = useState([]);
  const [filterColor, setFilterColor] = useState([]);
  const [priceState, setPriceState] = useState(false);

  const { keyword: currentPage } = useParams();

  const [allState, setAllState] = useState({
    price: false,
    gender: false,
    size: false,
    category: false,
    color: false,
  });

  const [prevState, setPrevState] = useState("");

  const { price, gender, size, category, color } = allState;

  const dispatch = useDispatch();

  const productCategoryList = useSelector((state) => state.productCategoryList);

  const { products } = productCategoryList;

  useEffect(() => {
    let obj = {};
    if (filterGender) {
      obj["gender"] = filterGender.join("|");
    }
    if (filterSize) {
      obj["size"] = filterSize.join("|");
    }
    if (filterPrice) {
      obj["lowPrice"] = filterPrice.minprice;
      obj["highPrice"] = filterPrice.maxprice;
    }
    // dispatch(getFilteredProductsAPI(obj));
  }, [dispatch, filterGender, filterSize, priceState]);

  const onChangeFilterPriceHandler = (e) => {
    const { name, value } = e.target;
    setFilterPrice({ ...filterPrice, [name]: value });
  };

  const onChangeFilterGenderHandler = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setFilterGender([...filterGender, value]);
    } else {
      setFilterGender(filterGender.filter((e) => e !== value));
    }
  };
  const onChangeFilterCategoryHandler = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setFilterCategory([...filterCategory, value]);
    } else {
      setFilterCategory(filterCategory.filter((e) => e !== value));
    }
  };
  const onChangeFilterSizeHandler = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setFilterSize([...filterSize, value]);
    } else {
      setFilterSize(filterSize.filter((e) => e !== value));
    }
  };
  const onChangeFilterColorHandler = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setFilterColor([...filterColor, value]);
    } else {
      setFilterColor(filterColor.filter((e) => e !== value));
    }
  };
  // console.log(filterGender, filterCategory, filterSize, filterColor);
  const submitPriceFilterHandler = () => {
    if (Number(filterPrice.minprice) >= Number(filterPrice.maxprice)) {
      alert("small price");
    } else {
      setPriceState(!priceState);
    }
  };

  const ToggleChange = (value) => {
    setPrevState(value);
    if (prevState !== value) {
      setAllState({ ...allState, [value]: true, [prevState]: false });
    } else {
      setAllState({
        price: false,
        gender: false,
        size: false,
        category: false,
        color: false,
      });
      setPrevState("");
    }
  };
  return (
    <Wrapper>
      <Row className="mt-3">
        <h5>Product Count {products.length}</h5>
      </Row>
      <Row className="m-1 p-2">
        <Col onClick={() => ToggleChange("price")}>Price</Col>
        <Col onClick={() => ToggleChange("size")}>Size</Col>
        <Col onClick={() => ToggleChange("category")}>Category</Col>
        {currentPage !== "allproducts" && (
          <Col onClick={() => ToggleChange("gender")}>Gender</Col>
        )}
        <Col onClick={() => ToggleChange("color")}>Color</Col>
      </Row>
      {price && (
        <Row>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Price</Accordion.Header>
              <Accordion.Body>
                <InputGroup className="mb-3" size="md">
                  <Form.Control
                    placeholder="Min Price"
                    name="minprice"
                    value={filterPrice.minprice}
                    onChange={(e) => onChangeFilterPriceHandler(e)}
                  />
                </InputGroup>
                <InputGroup className="mb-3" size="md">
                  <Form.Control
                    placeholder="Max Price"
                    name="maxprice"
                    value={filterPrice.maxprice}
                    onChange={(e) => onChangeFilterPriceHandler(e)}
                  />
                </InputGroup>
                <Button className="button" onClick={submitPriceFilterHandler}>
                  Apply
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      )}

      {currentPage && gender && (
        <Row>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Gender</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {["Mens", "Womens"].map((value) => (
                    <div key={value} className="mb-3">
                      <Form.Check type="checkbox">
                        <Form.Check.Input
                          type="checkbox"
                          isValid
                          value={value}
                          onChange={(e) => onChangeFilterGenderHandler(e)}
                        />
                        <Form.Check.Label>{value}</Form.Check.Label>
                      </Form.Check>
                    </div>
                  ))}
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      )}

      {size && (
        <Row>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Size</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {["Small", "Medium", "Large"].map((value) => (
                    <div key={value} className="mb-3">
                      <Form.Check type="checkbox">
                        <Form.Check.Input
                          type="checkbox"
                          isValid
                          value={value}
                          onChange={(e) => onChangeFilterSizeHandler(e)}
                        />
                        <Form.Check.Label>{value}</Form.Check.Label>
                      </Form.Check>
                    </div>
                  ))}
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      )}
      {category && (
        <Row>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Category</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {["Cloths", "Shoes"].map((value) => (
                    <div key={value} className="mb-3">
                      <Form.Check type="checkbox">
                        <Form.Check.Input
                          type="checkbox"
                          isValid
                          value={value}
                          onChange={(e) => onChangeFilterCategoryHandler(e)}
                        />
                        <Form.Check.Label>{value}</Form.Check.Label>
                      </Form.Check>
                    </div>
                  ))}
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      )}

      {color && (
        <Row>
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Color</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {["Black", "Red"].map((value) => (
                    <div key={value} className="mb-3">
                      <Form.Check type="checkbox">
                        <Form.Check.Input
                          type="checkbox"
                          isValid
                          value={value}
                          onChange={(e) => onChangeFilterColorHandler(e)}
                        />
                        <Form.Check.Label>{value}</Form.Check.Label>
                      </Form.Check>
                    </div>
                  ))}
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      )}
    </Wrapper>
  );
};

export default MobileViewFilters;

const Wrapper = styled.div`
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
