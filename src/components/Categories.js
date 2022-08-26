import React from "react";
import Slider from "react-slick";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const settings = {
  dots: false,
  loop: true,
  infinite: true,
  // autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 10,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
};

const Categories = () => {
  return (
    <div className="category">
      <h2> Categories</h2>
      <Slider {...settings} className="categories-item">
        <Link to="/products">
          <img
            src={process.env.PUBLIC_URL + "/images/laptop.png"}
            alt="product"
          />
        </Link>
        <Link to="/products">
          <img
            src={process.env.PUBLIC_URL + "/images/mobiles.png"}
            alt="product"
          />
        </Link>
        <Link to="/products">
          <img
            src={process.env.PUBLIC_URL + "/images/cate-6.png"}
            alt="product"
          />
        </Link>
        <img src={process.env.PUBLIC_URL + "/images/shoes.png"} alt="product" />
        <Link to="/products">
          <img
            src={process.env.PUBLIC_URL + "/images/schoolbag.png"}
            alt="product"
          />
        </Link>
        <Link to="/products">
          <img
            src={process.env.PUBLIC_URL + "/images/electronics.png"}
            alt="product"
          />
        </Link>
        <img
          src={process.env.PUBLIC_URL + "/images/fragrance.png"}
          alt="product"
        />
        <Link to="/products">
          <img
            src={process.env.PUBLIC_URL + "/images/home-decor.png"}
            alt="product"
          />
        </Link>
        {/* <Link to="/products">
          <img
            src={process.env.PUBLIC_URL + "/images/homeappliance.png"}
            alt="product"
          />
        </Link>
        <Link to="/products">
          <img
            src={process.env.PUBLIC_URL + "/images/beauty.png"}
            alt="product"
          />
        </Link>
        <Link to="/products">
          <img
            src={process.env.PUBLIC_URL + "/images/toys.png"}
            alt="product"
          />
        </Link> */}
        {/* <Link to="/products">
          <img
            src={process.env.PUBLIC_URL + "/images/television.png"}
            alt="product"
          />
        </Link>
        <Link to="/products">
          <img
            src={process.env.PUBLIC_URL + "/images/baby.png"}
            alt="product"
          />
        </Link> */}
      </Slider>

      <div className="sub-banner my-4">
        <Row>
          <Col md={3} lg={3}>
            <img
              src={process.env.PUBLIC_URL + "/images/sub-banner1.png"}
              alt="product"
            />
          </Col>
          <Col md={3} lg={3}>
            <img
              src={process.env.PUBLIC_URL + "/images/sub-banner2.png"}
              alt="product"
            />
          </Col>
          <Col md={3} lg={3}>
            <img
              src={process.env.PUBLIC_URL + "/images/sub-banner3.png"}
              alt="product"
            />
          </Col>
          <Col md={3} lg={3}>
            <img
              src={process.env.PUBLIC_URL + "/images/sub-banner4.png"}
              alt="product"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Categories;
