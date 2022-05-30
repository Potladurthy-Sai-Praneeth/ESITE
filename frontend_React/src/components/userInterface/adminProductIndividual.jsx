import React from "react";
import { Link } from "react-router-dom";
import "./../../Styling/App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Fragment } from "react/cjs/react.production.min";
import AdminProductEdit from "./adminProductEdit";
class AdminProductIndividual extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderChild: false,
    };
    this.intermediateFunction = this.intermediateFunction.bind(this);
  }
  async intermediateFunction(type, url, payload = {}) {
    this.props.dispatch(type, url, payload);
    this.setState({ renderChild: false });
  }

  render() {
    return (
      <Fragment>
        {!this.state.renderChild && (
      <tr >
        <td>{this.props.data.category}</td>
        <td>{this.props.data.id}</td>
        <td>{this.props.data.prodname}</td>
        <td>
          {"₹ " + new Intl.NumberFormat("en-IN").format(this.props.data.price)}
        </td>
        <td>{this.props.data.popularity}</td>
       
          <td>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.setState({ renderChild: true });
              }}>
              Edit
            </button>
          </td>
       
        <td>
          <Link to={{ pathname: "/AdminProduct" }}>
            <button
              className="btn btn-danger"
              onClick={() => {
                this.props.dispatch(
                  "DELETE_PRODUCT",
                  `http://localhost:8081/api/deleteProduct/${this.props.data._id}`
                );
              }}>
              Delete
            </button>
          </Link>
        </td>
      </tr>
        )}
        {this.state.renderChild && (
          <AdminProductEdit
            indi={this.props.data}
            dispatch={this.intermediateFunction}
          />
        )}
      </Fragment>
    );
  }
}

export default AdminProductIndividual;
