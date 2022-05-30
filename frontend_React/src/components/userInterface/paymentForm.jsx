import { CardElement } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(""); // User your personal publishable Stripe Api Keys

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      lineHeight: "27px",
      color: "#212529",
      fontSize: "1.1rem",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export default function PaymentForm(props) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [userObj, setUserObj] = useState(props.store.individualUserObject);
  const [prev, setPrev] = useState(props.store.individualUserObject.items);
  const [cartArray, setCartArray] = useState(props.store.cart);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setLoading(true);
    setErrorMsg("");

    const paymentMethodObj = {
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name,
        email,
      },
    };
    const paymentMethodResult = await stripe.createPaymentMethod(
      paymentMethodObj
    );

    stripePaymentMethodHandler(
      {
        result: paymentMethodResult,
        amount: props.amount,
      },
      handleResponse
    );
  };

  // callback method to handle the response
  const handleResponse = (response) => {
    setLoading(false);
    if (response.error) {
      setErrorMsg(
        typeof response.error === "string"
          ? response.error
          : response.error.message
      );
      return;
    }
    props.setPaymentCompleted(response.success ? true : false);
  };

  return (
    <React.Fragment>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Pay with card</span>
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="cc-name">Name on card</label>
            <input
              id="cc-name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cc-email">Email</label>
            <input
              id="cc-email"
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="cc-number">Card Number</label>
            <CardNumberElement
              id="cc-number"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="expiry">Expiration Date</label>
            <CardExpiryElement
              id="expiry"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cvc">CVC</label>
            <CardCvcElement
              id="cvc"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>

        <hr className="mb-4" />
        <button
          className="btn btn-dark w-100"
          type="submit"
          disabled={loading}
          onClick={() => {
            let allOrders = [];
            allOrders = setPrev(...cartArray);

            props.dispatch(
              "UPDATE_USER",
              `http://localhost:8081/api/updateUsers/${userObj._id}`,
              {
                orders: userObj.orders + 1,
                items: allOrders,
              }
            );
            props.dispatch(
              "DELETE_CART_ALL",
              `http://localhost:8081/api/deleteTotalCart/${userObj._id}`
            );
          }}
        >
          {loading ? (
            <div
              className="loader loader-border loader-border-sm text-light"
              role="status"
            ></div>
          ) : (
            `PAY ₹ ${new Intl.NumberFormat("en-IN").format(
              props.store.cartAmount
            )}`
          )}
        </button>
        {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
      </form>
    </React.Fragment>
  );
}
