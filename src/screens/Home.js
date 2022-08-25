import axios from "axios";
import React, { useEffect, useReducer } from "react";
import _ from "underscore";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import ErrorBoundary from "../components/ErrorBoundary";
import Footer from "../components/Footer";
import MenuList from "../components/Navbar";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Row, Col, Container } from "react-bootstrap";
import Slider from "react-slick";
import { base_url } from "../services/index";

const config = {
  loop: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Home = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`${base_url}/api/products`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div className="site-container">
      <MenuList />
      <Banner />
      <Categories />
      <ErrorBoundary>
        <div className="products" style={{ textAlign: "center" }}>
          <h1 className="my-3">Featured Products</h1>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Container>
              <Row>
                <Slider {...config}>
                  {products.map((product) => (
                    <Col key={product.slug} className="mb-3">
                      <Product product={product}></Product>
                    </Col>
                  ))}
                </Slider>
              </Row>
              <Row>
                {Object.keys(
                  _.groupBy(products, (product) => product.category)
                ).map((category) => {
                  const groupedObj = _.groupBy(
                    products,
                    (product) => product.category
                  );
                  return (
                    <>
                      <p
                        className="CategoryName my-3"
                        style={{
                          fontSize: "18px",
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                          backgroundColor: "brown",
                          padding: "10px",
                        }}
                      >
                        {category}
                      </p>
                      {groupedObj[category].slice(0, 4).map((product) => (
                        <Col
                          key={product.slug}
                          sm={6}
                          md={3}
                          lg={3}
                          className="mb-3"
                        >
                          <Product product={product}></Product>
                        </Col>
                      ))}
                    </>
                  );
                })}
              </Row>
            </Container>
          )}
        </div>
      </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default Home;
