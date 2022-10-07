import "react-bootstrap-drawer/lib/style.css";
import React, { useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { Drawer } from "react-bootstrap-drawer";
import styled from "styled-components";
import { Link } from "react-router-dom";

const RoterLink = ({ name, onClick }) => {
  return (
    <Link
      to={name === "ALL PRODUCTS" ? `/allprouducts` : `/${name}`}
      className="routerlink"
      onClick={onClick}
    >
      {name}
    </Link>
  );
};

let LinkText = ["HOME", "ALL PRODUCTS", "MENS", "WOMENS", "CHILDREN"];

export const ApplicationDrawer = (props) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Wrapper>
      <Drawer {...props}>
        <Drawer.Toggle onClick={handleToggle} onToggle />

        <Collapse in={open}>
          <Drawer.Overflow>
            <Drawer.ToC className="TOC">
              {LinkText.map((el) => {
                return <RoterLink name={el} onClick={handleToggle} />;
              })}
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
  /* background-color: black; */
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
`;
