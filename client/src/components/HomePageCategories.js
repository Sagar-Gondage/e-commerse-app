import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const RoterLink = ({ name, onClick }) => {
  return (
    <div className="routerlink" onClick={() => onClick(name)}>
      {name}
    </div>
  );
};

let LinkText = ["HOME", "ALL PRODUCTS", "mens", "womens", "CHILDREN"];

const HomePageCategories = () => {
  const navigate = useNavigate();
  const handleOnClick = (value) => {
    console.log(value);
    navigate("/mens");
    navigate({
      //   pathname: `/product/${value}`,
      pathname: `/product/${value}`,
      //   search: "?category=date&order=newest",
      //   search: `?category=${value}`,
    });
  };

  return (
    <Wrapper>
      <ul>
        {LinkText.map((el, index) => {
          return (
            <li key={index}>
              <RoterLink name={el} onClick={handleOnClick} />
            </li>
          );
        })}
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
    padding: 0;
    list-style: none;
    display: table;
    width: 600px;
    text-align: center;
    margin: auto;
  }
  li {
    display: table-cell;
    position: relative;
    border: 1px solid white;
    /* padding: 15px 0; */
  }
  a {
    color: black;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.15em;

    display: inline-block;
    padding: 5px 10px;
    position: relative;
  }
  a:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    /* display: block; */
    height: 2px;
    left: 50%;
    position: absolute;
    background: black;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  a:hover:after {
    width: 100%;
    left: 0;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
