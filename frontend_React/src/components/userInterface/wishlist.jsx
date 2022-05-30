import React from "react";
import CartIndividual from "./cartIndividual";
import "./../../Styling/App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "./footer";
import { bindActionCreators } from "redux";
import { startAddingToCart } from "../actions/actions";
import { startGettingAllWishlist } from "../actions/actions";
import { startDeletingIndividualWishlist } from "../actions/actions";
import { startDeletingAllWishlist } from "../actions/actions";
import { connect } from "react-redux";
import { startShowingLoading } from "../actions/actions";
import { startHidingLoading } from "../actions/actions";
import Fallback from "./fallback";
function mapStateToProps(state) {
  return {
    store: state,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      startHidingLoading,
      startShowingLoading,
      startGettingAllWishlist,
      startAddingToCart,
      startDeletingAllWishlist,
      startDeletingIndividualWishlist,
    },
    dispatch
  );
}
class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ar: [],
      items: 0,
      extra: false,
      divs: [],
    };
    this.func = this.func.bind(this);
    this.func();
    this.emptyIndividual = this.emptyIndividual.bind(this);
  }
  async componentDidUpdate() {
    if (this.state.extra) {
      this.setState({ divs: [] });
      this.setState({ ar: [] });
      this.setState({ extra: false });
      this.func();
    }
  }

  async func() {
  await this.props.startGettingAllWishlist(
     `http://localhost:8081/api/wishlist/${this.props.store.individualUserObject._id}`
   );
    setTimeout(() => {
      {
        this.setState({ ar: this.props.store.wishlist });
        this.setState({ items: this.state.ar.length });
        this.setState({ divs: [] });
      }
    }, 1000);
  }
  async emptyIndividual(id) {
    await this.props.startDeletingIndividualWishlist(
      `http://localhost:8081/api/deleteWishlist/${this.props.store.individualUserObject._id}/${id}`
    );
    this.setState({ extra: true });
    this.props.startShowingLoading();
    setTimeout(() => {
      this.props.startHidingLoading();
    }, 1100);
  }

  render() {
    if (this.props.store.loading) return <Fallback />;
    if (this.state.items === 0)
      return (
        <div>
          <h2 className="Wishlist_empty">
            <i>Your Wishlist is Empty</i>
          </h2>
        </div>
      );
    else {
      return (
        <div>
          <div>
            {this.state.ar.map((item, index) => {
              return (
                <CartIndividual
                  data={item}
                  from="wishlist"
                  modify={this.emptyIndividual}
                  key={index}
                />
              );
            })}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="Wishlist_buttons">
            <div className="row">
              <div className="col-md-5">
                <Link
                  to={{
                    pathname: "/Wishlist",
                  }}
                  style={{ textDecoration: "none" }}>
                  <button
                    className="btn btn-danger"
                    onClick={
                      () => {
                        this.props.startDeletingAllWishlist(
                          `http://localhost:8081/api/deleteTotalWishlist/${this.props.store.individualUserObject._id}`
                        );
                        this.props.startShowingLoading();
                        setTimeout(() => {
                          this.props.startHidingLoading();
                        }, 1100);
                        this.setState({
                          ar: [],
                          extra: true,
                          items: 0,
                        });
                      }
                      
                    }>
                    Empty Wishlist
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <br />
          <Footer />
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
