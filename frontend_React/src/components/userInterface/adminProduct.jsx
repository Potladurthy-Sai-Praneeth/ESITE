import React from "react";
import { Link } from "react-router-dom";
import "./../../Styling/App.css";
import "bootstrap/dist/css/bootstrap.css";
import AdminProductIndividual from "./adminProductIndividual";
import Footer from "./footer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { startGettingRequestedProducts } from "../actions/actions";
import { startShowingLoading } from "../actions/actions";
import { startHidingLoading } from "../actions/actions";
import { startAddingProduct } from "../actions/actions";
import { startEditingProduct } from "../actions/actions";
import { startDeletingProduct } from "../actions/actions";
import AdminProductAdd from "./adminProductAdd";
import { Fragment } from "react/cjs/react.production.min";
import Fallback from "./fallback";
function mapStateToProps(state) {
  return {
    store: state,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      startGettingRequestedProducts,
      startAddingProduct,
      startShowingLoading,
      startHidingLoading,
      startEditingProduct,
      startDeletingProduct,
    },
    dispatch
  );
}
class AdminProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      renderChild: false,
      extra: false,
    };
    this.getdata = this.getdata.bind(this);
    this.getdata();

    this.enumFunction = this.enumFunction.bind(this);
  }
  async enumFunction(type, url, payload = {}) {
    switch (type) {
      case "ADD_PRODUCT": {
        await this.props.startAddingProduct(url, payload);
        this.setState({ renderChild: false, extra: true });

        break;
      }

      case "EDIT_PRODUCT": {
        await this.props.startEditingProduct(url, payload);
        this.setState({ renderChild: false, extra: true });

        break;
      }

      case "DELETE_PRODUCT": {
        await this.props.startDeletingProduct(url);
        this.setState({ renderChild: false, extra: true });

        break;
      }
    }
  }
  componentDidUpdate() {
    if (this.state.extra) {
      this.setState({ extra: false });
      this.getdata();
    }
  }

  async getdata() {
    this.props.startShowingLoading();
    await this.props.startGettingRequestedProducts(
      "http://localhost:8081/api/products"
    );
    console.log(this.props.store);
    setTimeout(() => {
      this.setState({ products: this.props.store.requestedProducts });
      this.props.startHidingLoading();
    }, 1100);
    
  }

  render() {
    
    if (this.state.loading) return <Fallback />;
    return (
      <Fragment>
        {!this.state.renderChild && (
          <div id="admintable">
            <h1 className="display-4 text-center text-black mb-3">
              <i>Items List</i>
            </h1>
            <button
              className="btn btn-success"
              onClick={() => {
                this.setState({ renderChild: true });
              }}>
              Add Product
            </button>
            <br />
            <br />
            <table className="table table-striped table-bordered  table-sm table-responsive">
              <thead className="head">
                <tr>
                  <td className="head-element">Category</td>
                  <td className="head-element">Id</td>
                  <td className="head-element">Product Name</td>
                  <td className="head-element">Price</td>
                  <td className="head-element">Popularity</td>
                  <td className="head-element">Edit</td>
                  <td className="head-element">Delete</td>
                </tr>
              </thead>
              <tbody>
                {this.state.products.map((el) => {
                  return (
                    <AdminProductIndividual
                      data={el}
                      dispatch={this.enumFunction}
                      key={el._id}
                    />
                  );
                })}
              </tbody>
            </table>
            <br />
            <Footer />
          </div>
        )}
        {this.state.renderChild && (
          <AdminProductAdd
            dispatch={this.enumFunction}
            key={this.state.products.length}
          />
        )}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProduct);
