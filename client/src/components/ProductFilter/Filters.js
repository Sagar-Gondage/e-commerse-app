import React, { useState } from "react";
import { Accordion, Form, InputGroup, Row, Button } from "react-bootstrap";

const Filters = () => {
  const [filterPrice, setFilterPrice] = useState({});
  const [filterGender, setFilterGender] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterSize, setFilterSize] = useState([]);
  const [filterColor, setFilterColor] = useState([]);

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
  console.log(filterGender, filterCategory, filterSize, filterColor);
  const submitPriceFilterHandler = () => {
    if (Number(filterPrice.minprice) >= Number(filterPrice.maxprice)) {
      alert("small price");
    } else {
      console.log(filterPrice);
    }
  };

  return (
    <>
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
      <Row>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Gender</Accordion.Header>
            <Accordion.Body>
              <Form>
                {["Male", "Female"].map((value) => (
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
      <Row>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Size</Accordion.Header>
            <Accordion.Body>
              <Form>
                {["Small", "medium", "lagre"].map((value) => (
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
      <Row>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Gender</Accordion.Header>
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
      <Row>
        <Accordion defaultActiveKey="0">
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
    </>
  );
};

export default Filters;
