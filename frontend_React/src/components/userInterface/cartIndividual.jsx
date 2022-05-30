import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./../../Styling/App.css";
import { Link } from "react-router-dom";
import axios from "axios";

class CartIndividual extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      from: this.props.from,
      quantity: this.props.data.quantity,
      individualCart: [],
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.deleteCart = this.deleteCart.bind(this);
    this.deleteWishlist = this.deleteWishlist.bind(this);
  }
  increment() {
    this.setState({ quantity: this.props.data.quantity + 1 });
    this.props.change(this.props.data._id, this.props.data.quantity + 1);
  }
  decrement() {
    this.setState({ quantity: this.props.data.quantity - 1 });

    this.props.change(this.props.data._id, this.props.data.quantity - 1);
  }
  deleteCart() {
    this.props.empty(this.props.data._id);
  }
  deleteWishlist() {
    this.props.modify(this.props.data._id);
  }

  render() {
    return (
      <div>
        <Link
          to={{
            pathname: `/ProductList/${this.props.data.id}`,
            state: this.props.data,
          }}
          className="link">
          <div className="row container mb-3 each productIndividual">
            <div className="card" id="card-img-row">
              <div className="col-md-9">
                <h4 className="card-title mt-3 font-weight-bold mb-2">
                  {this.props.data.prodname}
                </h4>
                <p className="card-subtitle font-italic text-muted mb-2">
                  {this.props.data.content}
                </p>
                <div className="row no-mobile">
                  <div className="col-md-3">
                    <h5 className="font-weight-bold mt-2">
                      {"₹ " +
                        new Intl.NumberFormat("en-IN").format(
                          this.props.data.price
                        )}
                    </h5>
                  </div>
                  <div className="col-md-3">
                    <ul className="list-inline smIndividual">
                      <li className="list-inline-item mt-15">
                        <i className="fa fa-star text-success"> </i>
                      </li>
                      <li className="list-inline-item mt-15">
                        <i className="fa fa-star text-success"> </i>
                      </li>
                      <li className="list-inline-item mt-15">
                        <i className="fa fa-star text-success"> </i>
                      </li>
                      <li className="list-inline-item mt-15">
                        <i className="fa fa-star text-success"> </i>
                      </li>
                      <li className="list-inline-item mt-15">
                        <i className="fa fa-star-o text-gray"> </i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <p> Awesome Deals at Discounted Prices </p>
                </div>
              </div>
              <div className="col-md-3">
                <img
                  src={this.props.data.image}
                  alt="Generic placeholder"
                  className="card-img"
                />
              </div>
            </div>
          </div>
        </Link>
        <div className="row">
          <div className="col-md-3 center">
            <Link to={this.state.from === "cart" ? "/Cart" : "/Wishlist"}>
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (this.state.from === "cart") {
                    this.deleteCart();
                  } else {
                    this.deleteWishlist();
                  }
                }}>
                Delete
              </button>
            </Link>
          </div>
          <div className="col-md-3 center">
            {this.state.from === "cart" && (
              <label style={{ display: "inline-block" }}>
                <Link to="/Cart">
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      this.increment();
                    }}>
                    +
                  </button>
                </Link>
                &nbsp; &nbsp; &nbsp; &nbsp; Quantity: {this.state.quantity}
                &nbsp;
                <Link to="/Cart">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.decrement();
                    }}>
                    -
                  </button>
                </Link>
              </label>
            )}
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default CartIndividual;
