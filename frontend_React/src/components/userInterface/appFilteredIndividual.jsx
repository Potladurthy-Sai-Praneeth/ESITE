import React from "react";
import { Link } from "react-router-dom";
import "../../Styling/App.css";
import "bootstrap/dist/css/bootstrap.css";

class AppFilteredIndividual extends React.Component {
  render() {
    return (
      <div className="col-md-3">
        <Link
          to={{
            pathname: `/ProductList/${this.props.data.id}`,
            state: this.props.data,
          }}
          className="link">
          <div className="card">
            <img
              src={this.props.data.image}
              className="card-img-top"
              alt="popular"
            />
            <div className="card-body">
              <h5 className="card-title">{this.props.data.prodname}</h5>
              <p className="card-text text-muted">{this.props.data.content}</p>
              <p>
                {"₹ " +
                  new Intl.NumberFormat("en-IN").format(this.props.data.price)}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default AppFilteredIndividual;
