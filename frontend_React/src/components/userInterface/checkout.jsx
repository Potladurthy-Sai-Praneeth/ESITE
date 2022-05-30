import React from "react";
import { ElementsConsumer, PaymentElement } from "@stripe/react-stripe-js";
import "../../Styling/App.css";
import { Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import OrderSummary from "./orderSummary";
class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prev: this.props.store.individualUserObject.items,
      userObj: this.props.store.individualUserObject,
      cartArray: this.props.store.cart,
      linkToSuccess: false,
      message: "",
      errorValid: false,
    };
    this.updateUserDetails = this.updateUserDetails.bind(this);
  }
  componentDidMount() {
    console.log(this.props.store);
    setTimeout(() => {
      this.setState({
        prev: this.props.store.individualUserObject.items,
        userObj: this.props.store.individualUserObject,
        cartArray: this.props.store.cart,
      });
    }, 1000);
  }
  async updateUserDetails() {
    console.log("in update function");
    this.setState({ linkToSuccess: true });
    let allOrders = [];

    allOrders = this.state.prev.concat(...this.state.cartArray);

    await this.props.dispatch(
      "UPDATE_USER",
      `http://localhost:8081/api/updateUsers/${this.state.userObj._id}`,
      {
        orders: this.state.userObj.orders + 1,
        items: allOrders,
      }
    );
    await this.props.dispatch(
      "DELETE_CART_ALL",
      `http://localhost:8081/api/deleteTotalCart/${this.state.userObj._id}`
    );
  }

  handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:4400/OrderSummary",
      },
      // return_url: "",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      this.setState({ errorValid: true, message: result.error.message });
    }
    if (result) this.updateUserDetails();
    else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      this.updateUserDetails();
    }
  };

  render() {
    return (
      <Fragment>
        {!this.state.linkToSuccess && (
          <div className="form-payment">
            <form onSubmit={this.handleSubmit} className="payment-form">
              <PaymentElement className="payment-element" />
              <button
                className="payment-button"
                disabled={!this.props.stripe}
                onClick={() => {
                  if (!this.state.errorValid) {
                    this.updateUserDetails();
                  }
                }}>
                {`PAY ₹ ${new Intl.NumberFormat("en-IN").format(
                  this.props.store.cartAmount
                )}`}
              </button>

              {this.state.errorValid && (
                <div id="payment-message">{this.state.message}</div>
              )}
            </form>
          </div>
        )}
        {this.state.linkToSuccess && <OrderSummary />}
      </Fragment>
    );
  }
}
export default function Checkout(props) {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm
          stripe={stripe}
          elements={elements}
          store={props.store}
          dispatch={props.dispatch}
        />
      )}
    </ElementsConsumer>
  );
}
