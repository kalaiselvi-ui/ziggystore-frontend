import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Badge,
  NavDropdown,
  Nav,
  Navbar,
  Container,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import getError from "../utils.js";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "../Store";
import SearchBox from "./SearchBox";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgLogIn } from "react-icons/cg";
import { base_url } from "../services/index.js";

const MenuList = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const [show, setShow] = useState(false);

  const showDropdown = (e) => {
    setShow(!show);
  };
  const hideDropdown = (e) => {
    setShow(false);
  };

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/products/categories`);
        setCategories(data);
      } catch (err) {
        // toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <div
        className={
          sidebarIsOpen
            ? "d-flex flex-column site-container active-cont"
            : "d-flex flex-column site-container"
        }
      >
        <Navbar variant="dark" className="top-navbar" expand="lg">
          <Container>
            {/* <Button
                            variant="dark"
                            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                        >
                            <i className="fas fa-bars"></i>
                        </Button> */}
            <LinkContainer to="/">
              <Navbar.Brand className="navbar-brand">
                <img
                  src={process.env.PUBLIC_URL + "/images/logo-2.png"}
                  alt="logo"
                />
              </Navbar.Brand>
            </LinkContainer>
            <SearchBox />
            <Nav className="justify-content-end">
              <Link
                to="/cart"
                className="nav-link cart-icon"
                style={{ color: "#fff" }}
              >
                <AiOutlineShoppingCart
                  className="cart-link"
                  style={{ fontSize: "30px", color: "#fff" }}
                />
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce(
                      (amount, count) => amount + count.quantity,
                      0
                    )}
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="basic-nav-dropdown"
                  variant="dark"
                  show={show}
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link signIn-btn" to="/signin">
                  <Button variant="outline-warning">
                    SignIn <CgLogIn style={{ fontSize: "23px" }} />
                  </Button>
                </Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin-nav-dropdown">
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Container>
        </Navbar>
        <div
          className={
            sidebarIsOpen
              ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
              : "side-navbar d-flex justify-content-between flex-wrap flex-column"
          }
        >
          <Nav className="flex-column text-white w-100 p-2 mt-5">
            {categories.map((category) => (
              <Nav.Item key={category} className="mt-3">
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
      </div>
      <div className="sub-header">
        <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="flex-row sub-header-nav justify-content-center text-black w-100">
                {categories.map((category) => (
                  <Nav.Item key={category} className="mt-1">
                    <LinkContainer
                      to={`/search?category=${category}`}
                      onClick={() => setSidebarIsOpen(false)}
                    >
                      <Nav.Link>{category}</Nav.Link>
                    </LinkContainer>
                  </Nav.Item>
                ))}
              </Nav>

              {/* <Nav className="me-auto sub-nav">
                                <Nav.Link href="#pricing" className="sub-link">Womens</Nav.Link>
                                <Nav.Link href="#features" className="sub-link">Mens</Nav.Link>
                                <Nav.Link href="#pricing" className="sub-link">Baby & Kids</Nav.Link>
                                <Nav.Link href="#pricing" className="sub-link">Beauty & Fragrance</Nav.Link>
                                <Nav.Link href="#pricing" className="sub-link">Sports</Nav.Link>
                                <Nav.Link href="#pricing" className="sub-link">Baby Toys</Nav.Link>
                                <NavDropdown title="Electronics" className='sub-link' id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Mobile Phones</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Laptops
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Home Appliance</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                        Accessories
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav> */}
              {/* <Nav>
                                <Nav.Link href="#deets">More deets</Nav.Link>
                                <Nav.Link eventKey={2} href="#memes">
                                    Dank memes
                                </Nav.Link>
                            </Nav> */}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default MenuList;
