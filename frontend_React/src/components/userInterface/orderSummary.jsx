import React from "react";
import "./../../Styling/App.css";
import { Link } from "react-router-dom";
class OrderSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="MyAccount">
        <header
          style={{
            color: "crimson",
          }}>
          Thank You , Your Order is Successfully Placed ✔
        </header>
        <main role="main">
          <div>
            <p>
              Our Delivery Partner will contact you at specified Address. Please
              ensure to follow social distancing.
            </p>
          </div>
        </main>
        <Link
          to={{
            pathname: "/Profile",
          }}>
          <button className="btn btn-success">View Orders</button>
        </Link>
      </div>
    );
  }
}

export default OrderSummary;
