import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.css";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "./../../Styling/App.css";
import axios from "axios";
import Footer from "./footer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { startAddingToCart } from "../actions/actions";
import { startAddingToWishlist } from "../actions/actions";
import { startShowingLoading } from "../actions/actions";
import { startHidingLoading } from "../actions/actions";

function mapStateToProps(state) {
  return {
    store: state,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      startAddingToWishlist,
      startAddingToCart,
      startHidingLoading,
      startShowingLoading,
    },
    dispatch
  );
}

class ProductDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.location.state,
      quantity: 1,
    };
  }
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ quantity: Number(event.target.value) });
  };
  render() {
    return (
      <div>
        <div className="container mt-5 mb-5">
          <div className="card">
            <div className="row g-0">
              <div className="col-md-6 border-end">
                <div className="d-flex flex-column justify-content-center ">
                  <div className="main_image">
                    <img
                      src={this.state.data.image}
                      id="main_product_image"
                      alt="main"
                    />
                  </div>
                  <div className="thumbnail_images">
                    <ul id="thumbnail">
                      <li>
                        <img
                          src={this.state.data.image}
                          width="50"
                          alt="side"
                        />
                      </li>
                      <li>
                        <img
                          src={this.state.data.image}
                          width="50"
                          alt="side"
                        />
                      </li>
                      <li>
                        <img
                          src={this.state.data.image}
                          width="50"
                          alt="side"
                        />
                      </li>
                      <li>
                        <img
                          src={this.state.data.image}
                          width="50"
                          alt="side"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 right-side">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3>{this.state.data.prodname}</h3>
                    <span className="heart">
                      <button
                        className="btn"
                        disabled={!this.props.store.isLoggedIn}
                        onClick={() => {
                          this.props.startAddingToWishlist(
                            `http://localhost:8081/api/addToWishlist/${this.props.store.individualUserObject._id}`,
                            {
                              productId: this.state.data._id,
                            }
                          );
                        }}>
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                      {/* </Link> */}
                    </span>
                  </div>
                  <div className="mt-2 pr-3 content">
                    <p>{this.state.data.content}</p>
                  </div>
                  <h3>
                    {"₹ " +
                      new Intl.NumberFormat("en-IN").format(
                        this.state.data.price
                      )}
                  </h3>
                  <div className="ratings d-flex flex-row align-items-center mb-1">
                    <div className="col-md-3 stars">
                      <ul className="list-inline small">
                        <li className="list-inline-item mt-15">
                          <i className="fa fa-star text-success"></i>
                        </li>
                        <li className="list-inline-item mt-15">
                          <i className="fa fa-star text-success"></i>
                        </li>
                        <li className="list-inline-item mt-15">
                          <i className="fa fa-star text-success"></i>
                        </li>
                        <li className="list-inline-item mt-15">
                          <i className="fa fa-star text-success"></i>
                        </li>
                        <li className="list-inline-item mt-15">
                          <i className="fa fa-star-o text-gray"></i>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-3 review">
                      {this.state.data.id * 867} reviews
                    </div>
                  </div>

                  <div className="offers mb-0">
                    <h5>Available Offers</h5>
                    <p>
                      <img
                        src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                        id="tag"
                        alt="tag"
                      />
                      Bank Offer 5% Unlimited Cashback on Axis Bank Credit Card
                      &nbsp;
                      <a href="#" id="terms">
                        T&C
                      </a>
                    </p>
                    <p>
                      <img
                        src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                        id="tag"
                        alt="tag"
                      />
                      Bank Offer 15% Instant discount on first Pay Later order
                      of ₹500 and above &nbsp;
                      <a href="#" id="terms">
                        T&C
                      </a>
                    </p>
                    <p>
                      <img
                        src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                        id="tag"
                        alt="tag"
                      />
                      Bank Offer 5% Unlimited Cashback on SBI Bank Credit Card
                      &nbsp;
                      <a href="#" id="terms">
                        T&C
                      </a>
                    </p>
                    <p>
                      <img
                        src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                        id="tag"
                        alt="tag"
                      />
                      Special PriceExtra ₹1000 off(price inclusive of discount)
                      &nbsp;
                      <a href="#" id="terms">
                        T&C
                      </a>
                    </p>
                    <p>
                      <img
                        src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/49f16fff-0a9d-48bf-a6e6-5980c9852f11.png?q=90"
                        id="tag"
                        alt="tag"
                      />
                      EMI starting from ₹347/month &nbsp;
                      <a href="#" id="terms">
                        View Plans &raquo;
                      </a>
                    </p>
                  </div>
                </div>
                <div className="mt-0">
                  <span className="fw-bold ">Colors</span>
                  <div className="colors ">
                    <ul id="marker">
                      <li id="marker-1"></li>
                      <li id="marker-2"></li>
                      <li id="marker-3"></li>
                      <li id="marker-4"></li>
                      <li id="marker-5"></li>
                    </ul>
                  </div>
                  <div className="quantity">
                    <form>
                      <label>Quantity</label>

                      <select
                        name="quantity"
                        value={this.state.quantity}
                        onChange={this.handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </form>
                  </div>
                </div>
                <div className="buttons d-flex flex-row mt-2 gap-5">
                  <Link
                    to={{
                      pathname: "/Cart",
                    }}>
                    <button
                      className="btn btn-outline-dark"
                      disabled={!this.props.store.isLoggedIn}
                      onClick={() => {
                        this.props.startAddingToCart(
                          `http://localhost:8081/api/addToCart/${this.props.store.individualUserObject._id}`,
                          {
                            productId: this.state.data._id,
                            price: this.state.data.price,
                            quantity: this.state.quantity,
                          }
                        );

                        this.props.startShowingLoading();
                        setTimeout(() => {
                          this.props.startHidingLoading();
                        }, 1100);
                      }}
                      type="submit">
                      Buy Now
                    </button>
                  </Link>
                  <button
                    className="btn btn-dark"
                    type="submit"
                    disabled={!this.props.store.isLoggedIn}
                    onClick={() => {
                      this.props.startAddingToCart(
                        `http://localhost:8081/api/addToCart/${this.props.store.individualUserObject._id}`,
                        {
                          productId: this.state.data._id,
                          price: this.state.data.price,
                          quantity: this.state.quantity,
                        }
                      );
                    }}>
                    Add to Basket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDisplay);
