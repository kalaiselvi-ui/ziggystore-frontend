import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import Footer from '../components/Footer'
import MenuList from '../components/Navbar'
import { Store } from '../Store'


const PaymentMethodScreen = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: {
            shippingAddress, paymentMethod }
    } = state;
    const [paymentMethodName, setPaymentMethod] = useState(
        paymentMethod || 'PayPal'
    );


    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder');
    }


    return (
        <div>
            <MenuList />
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <Helmet>
                <title>Payment Method</title>
            </Helmet>
            <div className='container small-container'>
                <h1 className='my-3'>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <div className='mb-3'>
                        <Form.Check type="radio" id="PayPal" label="PayPal" value="PayPal" checked={paymentMethodName === 'PayPal'}
                            onChange={(e) => setPaymentMethod(e.target.value)} />
                        <Form.Check type="radio" id="Stripe" label="Stripe" value="Stripe" checked={paymentMethodName === 'Stripe'}
                            onChange={(e) => setPaymentMethod(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <Button type="submit" variant='warning'>Continue</Button>
                    </div>
                </Form>
            </div>
        <Footer />
        </div>
    )
}

export default PaymentMethodScreen