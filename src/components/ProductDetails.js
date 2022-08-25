import axios from "axios";
import React, { useReducer, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Row, Col, ListGroup, Card, Badge, Button } from "react-bootstrap";
import Rating from "./Rating";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import getError from "../utils";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { base_url } from "../services/index";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  // const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH REQUEST" });
      try {
        const result = await axios.get(`${base_url}/api/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`${base_url}/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      toast.error("Sorry. Product is out of stock");
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
    navigate("/cart");
  };

  return (
    <div className="container" style={{ height: "100%" }}>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox className="my-3" variant="danger">
          {error}
        </MessageBox>
      ) : (
        <Row className="my-4">
          <Col md={6}>
            <img src={product.image} className="img-large" alt={product.name} />
          </Col>
          <Col md={3}>
            <ListGroup varient="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price : ${product.price} </ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup varient="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button onClick={addToCartHandler} variant="warning">
                          Add To Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductDetails;
