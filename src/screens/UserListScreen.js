import React, { useContext, useEffect, useReducer } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Helmet } from "react-helmet-async";
import getError from "../utils";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Container } from "react-bootstrap";
import { Store } from "../Store";
import MenuList from "../components/Navbar";
import { base_url } from "../services/index";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        users: action.payload,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};
const UserListScreen = () => {
  const [
    { loading, error, users, loadingDelete, successDelete, pages },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`${base_url}/api/users`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const deleteHandler = async (user) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        dispatch({ type: "DELETE_REQUEST" });
        await axios.delete(`${base_url}/api/users/${user._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success("user deleted successfully");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (error) {
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <MenuList />
      <Container>
        <h1>Users</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>IS ADMIN</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.isAdmin ? "YES" : "NO"}</td>
                      <td>
                        <Button
                          type="button"
                          variant="primary"
                          onClick={() => navigate(`/admin/user/${user._id}`)}
                        >
                          Edit
                        </Button>
                        &nbsp;
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => deleteHandler(user)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div>
              {[...Array(pages).keys()].map((x) => (
                <Link
                  className={x + 1 === Number(page) ? "btn text-bold" : "btn"}
                  key={x + 1}
                  to={`/admin/users?page=${x + 1}`}
                >
                  {x + 1}
                </Link>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default UserListScreen;
