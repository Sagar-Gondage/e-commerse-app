import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loginAPI, registerAPI } from "../actions/user.actions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { RESET_ERROR } from "../constants/user.constants";
import checkPassword from "../utils/CheckPassword";
import { toastError, toastSuccess } from "../utils/Toast";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const disptach = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  // eslint-disable-next-line no-restricted-globals
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      toastError(toast, error);
      disptach({ type: RESET_ERROR });
    }
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo, redirect, error]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setMessage(null);
    }
    if (password !== confirmPassword) {
      toastError(toast, "Passwords do not Match");
    } else {
      const isInValidPassword = checkPassword(password);

      if (name.length < 5) {
        toastError(toast, "name should be aleast 5 characters long");
      } else if (isInValidPassword) {
        toastError(toast, isInValidPassword);
      } else {
        // toastError(toast, "correct");
        // toastSuccess(toast, "Register Success");
        disptach(registerAPI(name, email, password));
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <FormContainer>
        <h1>Sign Up</h1>
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-2">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ?
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterPage;
