import React, { Fragment } from "react";
import "./Payment.css";
import Metadata from "../layout/Metadata/Metadata";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { Typography } from "@mui/material";
import { useRef } from "react";
import axios from "axios";
import { createNewOrder , clearErrors} from "../../actions/orderActions";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.order);

  const alert = useAlert();
  const payBtn = useRef(null);
  const navigate = useNavigate();
const dispatch = useDispatch()



  const paymentData = {
    amount:Math.round(orderInfo.totalPrice*100),
  }


  const submitPaymentHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;
    console.log('clikcedds ubmitPaymentHandler ')
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/process/payment",
        paymentData,
        config
      );
     
      const client_secret = data.client_secret;

      if (!elements || !stripe) return;
      console.log("data in payemnt client_secret" , client_secret)

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          // card: elements.getElement(CardNumberElement),
          card: elements.getElement(CardNumberElement),

          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              line2: shippingInfo.city,
              city: shippingInfo.city,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      console.log("result in --", result)
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
        console.log("error in payment js ==", result.error)
      } else {
        if (result.paymentIntent.status === "succeeded") {
          navigate("/success");
          const orderData = {
            shippingInfo:shippingInfo,
            orderItems:cartItems,
            paymentInfo:{id:result.paymentIntent.id, status:result.paymentIntent.status},
            itemsPrice:orderInfo.subTotal,
            taxPrice:orderInfo.tax,
            shippingPrice:orderInfo.shippingCharges,
            totalPrice:orderInfo.totalPrice,
          }
          dispatch(createNewOrder(orderData))
        } else {
          alert.error("there are issues while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }

    // const {error, paymentMethod} = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardElement),
    // });
  };
useEffect(() => {
  if(error){
    alert.error(error)
    // console.log("erororo in payment  js ==", error)
    dispatch(clearErrors())
  }

}, [error, dispatch, alert])

  return (
    <Fragment>
      <Metadata title={"payment"} />
      <div className="paymentDiv">
        <CheckoutSteps activeStep={2} />

        <div className="paymentContainer">
          <form
            className="paymentForm"
            onSubmit={(e) => submitPaymentHandler(e)}
          >
            <Typography>Card Details</Typography>4242 4242 4242 4242
            <div>
              <CreditCardIcon />
              <CardNumberElement className="paymentInput" />
            </div>
            <div>
              <EventIcon />
              <CardExpiryElement className="paymentInput" />
            </div>
            <div>
              <VpnKeyIcon />
              <CardCvcElement className="paymentInput" />
            </div>

            <button type="submit" disabled={!stripe || !elements} ref={payBtn}>
              {`Pay  $${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
