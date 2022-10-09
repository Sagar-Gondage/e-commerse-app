import "react-bootstrap-drawer/lib/style.css";
import React, { useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { Drawer } from "react-bootstrap-drawer";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const ApplicationDrawer = (props) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Wrapper>
      <Drawer {...props}>
        <Drawer.Toggle onClick={handleToggle} />

        <Collapse in={open}>
          <Drawer.Overflow>
            <Drawer.ToC className="TOC" onClick={handleToggle}>
              <Link to={"/"} className="routerlink">
                Home
              </Link>
              <Link to="/productcategory/allproducts" className="routerlink">
                All Products
              </Link>
              <Link to={"/productcategory/mens"} className="routerlink">
                Mens
              </Link>
              <Link to={"/productcategory/womens"} className="routerlink">
                Womens
              </Link>
              <Link to={"/productcategory/children"} className="routerlink">
                Children
              </Link>
            </Drawer.ToC>
          </Drawer.Overflow>
        </Collapse>
      </Drawer>
    </Wrapper>
  );
};

export const Application = (props) => {
  return (
    <Container fluid>
      <Row className="flex-xl-nowrap">
        <Col as={ApplicationDrawer} xs={12} md={3} lg={2} />
        <Col xs={12} md={9} lg={10}>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  color: red;
  @media screen and (min-width: 601px) {
    display: none;
  }

  .routerlink {
    color: inherit;
    text-decoration: inherit;
    font-size: 1.2rem;
  }

  .TOC {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 2px solid black; */
    color: red;
  }

  .TOC > * {
    background-color: #d2daff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    margin: 2px;
  }

  .TOC > *:hover {
    background-color: #aac4ff;
  }
`;
