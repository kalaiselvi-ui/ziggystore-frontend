import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <>
      <div className="home-category">
        <h2 className="main-title"> Categories</h2>
        <Row className="categories-item">
          <Col md={2} sm={6} xs={6}>
            <Link to="/products">
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/cate-4.png"}
                  alt="product"
                />
                <span className="text-center">Tops</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to="/products">
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/women-cate1.png"}
                  alt="product"
                />
                <span>Dress</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to="/products">
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/cate-4.png"}
                  alt="product"
                />
                <span>Pants</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to="/products">
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/cate-4.png"}
                  alt="product"
                />
                <span>T-shirts</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to="/products">
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/cate-4.png"}
                  alt="product"
                />
                <span>Sports Wear</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to="/products">
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/cate-4.png"}
                  alt="product"
                />
                <span>Night Wear</span>
              </div>
            </Link>
          </Col>
        </Row>
        <Row className="categories-item mt-2">
          <Col md={2} sm={6} xs={6}>
            <Link to="/products">
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/mens-cate.png"}
                  alt="product"
                />
                <span className="text-center">Shirts</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to="/products">
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/mens-cate.png"}
                  alt="product"
                />
                <span>Pants</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to="/products">
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/mens-cate.png"}
                  alt="product"
                />
                <span>Trouser</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to="/products">
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/mens-cate.png"}
                  alt="product"
                />
                <span>T-shirts</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to="/products">
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/mens-cate.png"}
                  alt="product"
                />
                <span>Sports Wear</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to="/products">
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/mens-cate.png"}
                  alt="product"
                />
                <span>Night Wear</span>
              </div>
            </Link>
          </Col>
        </Row>
      </div>
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
    </>
  );
};

export default Categories;
