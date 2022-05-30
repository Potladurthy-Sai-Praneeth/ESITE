import React from "react";
import CartIndividual from "./cartIndividual";
import "./../../Styling/App.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./footer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { startGettingAllCart } from "../actions/actions";
import { startGettingIndividualUser } from "../actions/actions";
import { startGettingCartAmount } from "../actions/actions";
import { startDeletingAllCart } from "../actions/actions";
import { startUpdatingCart } from "../actions/actions";
import { startDeletingIndividualCart } from "../actions/actions";
import { startShowingLoading } from "../actions/actions";
import { startHidingLoading } from "../actions/actions";
import { startCheckOut } from "../actions/actions";
import { startUpdatingUser } from "../actions/actions";
import Fallback from "./fallback";
import Checkout from "./checkout";
import { Fragment } from "react/cjs/react.production.min";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import PaymentForm from "./paymentForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51KsgN9SIhD4OerayAGOqw1f41eR4GJQMdM231t82O4qsoHoeF39UBENL83mFtOeTB8eq73thWgmknGecyJZT7Vol00VtWYIUfV"
);

function mapStateToProps(state) {
  return {
    store: state,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      startGettingAllCart,
      startGettingIndividualUser,
      startGettingCartAmount,
      startDeletingAllCart,
      startUpdatingCart,
      startDeletingIndividualCart,
      startShowingLoading,
      startHidingLoading,
      startUpdatingUser,
      startCheckOut,
    },
    dispatch
  );
}

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addedObjArray: [],
      items: 0,

      total: 0,
      url: "",
      path: "/Checkout",
      loggedUser: {},
      userArray: [],
      extra: false,
      renderChild: false,
    };

    this.gettingValue = this.gettingValue.bind(this);
    this.gettingValue();
    this.changeItem = this.changeItem.bind(this);
    this.emptyCart = this.emptyCart.bind(this);
    this.enumFunction = this.enumFunction.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }
  getOptions() {
    return {
      clientSecret: this.props.store.paymentSession,
      apperance: {
        theme: "stripe",
      },
    };
  }
  enumFunction(type, url, payload = {}) {
    switch (type) {
      case "UPDATE_USER": {
        this.props.startUpdatingUser(url, payload);
        break;
      }
      case "DELETE_CART_ALL": {
        this.props.startDeletingAllCart(url);
        break;
      }
    }
  }
  changeItem(id, qty) {
    if (qty !== 0)
      this.props.startUpdatingCart(
        `http://localhost:8081/api/updateCart/${this.props.store.individualUserObject._id}/${id}`,
        {
          quantity: qty,
        }
      );
    else if (qty === 0) {
      this.props.startDeletingIndividualCart(
        `http://localhost:8081/api/deleteCart/${this.props.store.individualUserObject._id}/${id}`
      );
    }
    this.setState({ extra: true, renderChild: false });
    this.props.startShowingLoading();
    setTimeout(() => {
      this.props.startHidingLoading();
    }, 1100);
  }
  async componentDidUpdate() {
    if (this.state.extra) {
      this.setState({ items: 0 });
      this.setState({ extra: false, renderChild: false });
      this.gettingValue();
    }
  }
  async emptyCart(id) {
    await this.props.startDeletingIndividualCart(
      `http://localhost:8081/api/deleteCart/${this.props.store.individualUserObject._id}/${id}`
    );
    this.setState({ extra: true });
  }
  async gettingValue() {
    await this.props.startGettingAllCart(
      `http://localhost:8081/api/cart/${this.props.store.individualUserObject._id}`
    );
    await this.props.startGettingCartAmount(
      `http://localhost:8081/api/getCartTotal/${this.props.store.individualUserObject._id}`
    );
    setTimeout(() => {
      {
        this.setState({ items: this.props.store.cartItems });

        this.setState({ addedObjArray: this.props.store.cart });
        this.setState({ loggedUser: this.props.store.individualUserObject });
        if (this.state.items > 0)
          this.setState({ total: this.props.store.cartAmount });
      }
    }, 1000);
  }
  render() {
    if (this.props.store.loading) return <Fallback />;
    else
      return (
        <Fragment>
          {!this.state.renderChild &&
            (this.state.items === 0 ? (
              <div>
                <h2 className="cart_empty">
                  <i> Your Cart is Empty </i>
                </h2>
              </div>
            ) : (
              <div>
                <div>
                  {this.state.addedObjArray.map((item, index) => {
                    return (
                      <CartIndividual
                        data={item}
                        from="cart"
                        change={this.changeItem}
                        empty={this.emptyCart}
                        key={index}
                      />
                    );
                  })}
                </div>
                <br />
                <br />
                <br />
                <br />
                <div className="cart-summary">
                  <p> No.of items in Cart: &nbsp; &nbsp; {this.state.items} </p>
                  <p>
                    Cart Subtotal: &nbsp; &nbsp; &nbsp;
                    {"₹ " +
                      new Intl.NumberFormat("en-IN").format(this.state.total)}
                  </p>
                </div>
                <br />
                <div className="cart_buttons">
                  <div className="row">
                    <div className="col-md-5">
                      {/* <Link
                  to={{
                    pathname: this.state.path,
                    // name: this.state.loggedUser,
                  }}
                  style={{ textDecoration: "none" }}> */}
                      <button
                        className="btn btn-success"
                        onClick={async () => {
                          this.props.startShowingLoading();
                          await this.props.startCheckOut(
                            `http://localhost:8081/api/checkout/${this.state.loggedUser._id}`,
                            {
                              email: this.state.loggedUser.userid,
                              product: this.state.addedObjArray,
                              amount: this.state.total,
                            }
                          );
                          setTimeout(() => {
                            this.props.startHidingLoading();
                            this.setState({ renderChild: true });
                          }, 1100);
                        }}>
                        Checkout
                      </button>
                      {/* </Link> */}
                    </div>
                    <div className="col-md-5">
                      <Link
                        to={{
                          pathname: "/Cart",
                        }}
                        style={{ textDecoration: "none" }}>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            this.props.startDeletingAllCart(
                              `http://localhost:8081/api/deleteTotalCart/${this.state.loggedUser._id}`
                            );

                            this.setState({
                              addedObjArray: [],
                              extra: true,
                              items: 0,
                            });
                          }}>
                          Empty Cart
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <br />
                <Footer />
              </div>
            ))}
          {this.state.renderChild && (
            <Elements options={this.getOptions()} stripe={stripePromise}>
              <Checkout
                store={this.props.store}
                dispatch={this.enumFunction}
              />
            </Elements>
          )}
        </Fragment>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
