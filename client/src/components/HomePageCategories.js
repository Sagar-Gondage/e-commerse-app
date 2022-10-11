import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomePageCategories = () => {
  const navigate = useNavigate();
  const handleOnClick = (value) => {
    // console.log(value);
    if (value === "") {
      navigate("/");
    } else {
      navigate({
        //   pathname: `/product/${value}`,
        // pathname: `/product/${value}`,

        pathname: `/productcategory/${value}`,
        //   search: "?category=date&order=newest",
        //   search: `?category=${value}`,
      });
    }
  };

  return (
    <Wrapper>
      <ul>
        <li onClick={() => handleOnClick("")}>Home</li>
      </ul>
      <ul>
        <li onClick={() => handleOnClick("allproducts")}>All Products</li>
      </ul>
      <ul>
        <li onClick={() => handleOnClick("mens")}>Mens</li>
      </ul>
      <ul>
        <li onClick={() => handleOnClick("womens")}>Womens</li>
      </ul>
      <ul>
        <li onClick={() => handleOnClick("children")}>Children</li>
      </ul>
    </Wrapper>
  );
};

export default HomePageCategories;

const Wrapper = styled.div`
  background-color: #d8d9cf;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;

  ul {
    /* margin: 50px auto 0; */
    padding: 10px 0;
    list-style: none;
    display: table;
    width: 600px;
    text-align: center;
    margin: auto;
  }
  li {
    display: table-cell;
    position: relative;
    /* border: 1px solid white; */
    padding: 0 0 5px 0;
  }
  a {
    color: black;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.15em;

    display: inline-block;
    /* padding: 5px 10px; */
    position: relative;
  }
  li:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 3px;
    left: 50%;
    position: absolute;
    background: black;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  li:hover:after {
    width: 100%;
    left: 0;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
