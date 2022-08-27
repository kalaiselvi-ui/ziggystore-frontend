import React, { useContext, useState, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Axios from "axios";
import { Store } from "../Store";
import MenuList from "../components/Navbar";
import { toast } from "react-toastify";
import getError from "../utils";
import Footer from "../components/Footer";
import { base_url } from "../services/index";

const SigninScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  console.log("err", base_url);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(`${base_url}/api/users/signin`, {
        email,
        password,
      });
      ctxDispatch({
        type: "USER_SIGNIN",
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      // console.log(err);
      toast.error(getError(err));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <>
      <MenuList />
      <Container className="small-container signup-form mt-3">
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <h1 className="my-3 text-center">Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
            <div className="my-3">
              <Button type="submit" variant="warning" style={{ width: "100%" }}>
                Sign In
              </Button>
            </div>
            <div className="mb-3">
              New Customer?{" "}
              <Link to={`/signup?redirect=${redirect}`}>
                Create Your account
              </Link>
            </div>
          </Form.Group>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default SigninScreen;
