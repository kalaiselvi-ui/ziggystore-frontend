import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";
import { base_url } from "../services/index";
import { AiFillEye } from "react-icons/ai";
import { BsCartFill } from "react-icons/bs";

function Product(props) {
  const { product } = props;
  const { slug } = useParams;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`${base_url}/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <>
      <Card className="product-card">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
        </Link>
        <Card.Body className="card-details">
          <Link to={`/product/${product.slug}`}>
            <Card.Title>
              {product.name.length > 25
                ? `${product.name.substring(0, 25)}...`
                : product.name}
            </Card.Title>
          </Link>
          <Card.Text>
            <span style={{ fontWeight: "bold", fontSize: "15px" }}>
              {product.brand}
            </span>
          </Card.Text>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text>
            <span
              style={{ fontWeight: "bold", fontSize: "20px" }}
              className="mb-2"
            >
              {product.price}
            </span>
            $
          </Card.Text>

          {product.countInStock === 0 ? (
            <Button variant="danger" className="cart-btn">
              No Stock
            </Button>
          ) : (
            <Button
              onClick={() => addToCartHandler(product)}
              className="cart-btn"
              id="add-btn"
              variant="warning"
            >
              Add to cart
            </Button>
          )}
        </Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Text>
            <div class="hover-icons d-flex flex-row justify-content-between">
              <Link to={"/cart"}>
                <BsCartFill
                  onClick={() => addToCartHandler(product)}
                  className="cart-btn"
                  id="add-btn"
                  variant="warning"
                />
              </Link>
              <Link to={`/product/${product.slug}`}>
                <AiFillEye />
              </Link>
            </div>
          </Card.Text>
        </Link>
      </Card>
    </>
  );
}
export default Product;
