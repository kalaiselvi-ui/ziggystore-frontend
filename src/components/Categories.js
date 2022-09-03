import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { base_url } from "../services/index.js";
import getError from "../utils.js";
import { Row, Col, Container } from "react-bootstrap";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <>
      <div className="home-category">
        <h2 className="main-title"> Categories</h2>
        <Row className="categories-item">
          <Col md={2} sm={6} xs={6}>
            <Link to={`/search?category}`}>
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/w-tops.png"}
                  alt="product"
                />
                <span className="text-center">Tops</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to={`/search?category}`}>
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/w-dress.png"}
                  alt="product"
                />
                <span>Dress</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to={`/search?category}`}>
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/w-pant.png"}
                  alt="product"
                />
                <span>Pants</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to={`/search?category}`}>
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/w-tshirt.png"}
                  alt="product"
                />
                <span>T-shirts</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to={`/search?category}`}>
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/w-sports.png"}
                  alt="product"
                />
                <span>Sports Wear</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to={`/search?category}`}>
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/w-night.png"}
                  alt="product"
                />
                <span>Night Wear</span>
              </div>
            </Link>
          </Col>
        </Row>
        <Row className="categories-item mt-2">
          <Col md={2} sm={6} xs={6}>
            <Link to={`/search?category}`}>
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/m-shirt.png"}
                  alt="product"
                />
                <span className="text-center">Shirts</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to={`/search?category}`}>
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/m-pants.png"}
                  alt="product"
                />
                <span>Pants</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to={`/search?category}`}>
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/m-shorts.png"}
                  alt="product"
                />
                <span>Trouser</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to={`/search?category}`}>
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/m-tshirt.png"}
                  alt="product"
                />
                <span>T-shirts</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to={`/search?category}`}>
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/m-sports.png"}
                  alt="product"
                />
                <span>Sports Wear</span>
              </div>
            </Link>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <Link to={`/search?category}`}>
              <div className="category-products">
                <img
                  src={process.env.PUBLIC_URL + "/images/m-night.png"}
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
