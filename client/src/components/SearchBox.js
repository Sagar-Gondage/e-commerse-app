import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchFormSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}/page/1`);
    } else {
      navigate("/");
    }
  };
  return (
    <Form onSubmit={searchFormSubmitHandler}>
      <Form.Control
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Product"
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
