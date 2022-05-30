import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./../../Styling/App.css";
import { Link } from "react-router-dom";

class ProductIndividual extends React.Component {
  constructor(props) {
    super(props);
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
          <div className="row container mb-3 each">
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
                </div>
                <div className="row">
                  <p>Awesome Deals at Discounted Prices</p>
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
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default ProductIndividual;
