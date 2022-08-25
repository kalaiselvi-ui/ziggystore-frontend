import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import getError from '../utils';
import Button from 'react-bootstrap/esm/Button';
import MenuList from '../components/Navbar'
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, 
        orders: action.payload,
         loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
      case 'DELETE_REQUEST':
        return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
        return {
            ...state,
            loadingDelete: false,
            successDelete: true,
        };
    case 'DELETE_FAIL':
        return { ...state, loadingDelete: false };
        case 'DELETE_RESET':
          return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders, loadingDelete, successDelete }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `/api/orders/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
  } else {
      fetchData();
  }
  }, [userInfo, successDelete]);

  const returnHandler = async (order) => {
    if (window.confirm('Are you sure to Return?')) {
        try {
            dispatch({ type: 'RETURN_REQUEST' });
            await axios.get(`/api/orders/${order._id}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            toast.success('We will get Back to you Soon');
            dispatch({ type: 'REQUEST_SUCCESS' });
        } catch (err) {
            toast.error(getError(error));
            dispatch({
                type: 'REQUEST_FAIL',
            });
        }
    }
};

  const deleteHandler = async (order) => {
    if (window.confirm('Are you sure to cancel?')) {
        try {
            dispatch({ type: 'DELETE_REQUEST' });
            await axios.delete(`/api/orders/${order._id}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            toast.success(`order Cancelled successfully with ${order._id} `);
            dispatch({ type: 'DELETE_SUCCESS' });
        } catch (err) {
            toast.error(getError(error));
            dispatch({
                type: 'DELETE_FAIL',
            });
        }
    }
};


  return (
    <div>
      <MenuList />
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <Container>
        <h1>Order History</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : 'No'}
                  </td>
                  <td>
                    <Button
                      className='mx-2'
                      type="button"
                      variant="primary"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </Button>
                    {
                      
                    }
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => returnHandler(order)}
                    >
                      Return
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="warning"
                      onClick={() => deleteHandler(order)}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Container>
    </div>
  );
}