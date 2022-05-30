import React from "react";
import { Link } from "react-router-dom";
import "./../../Styling/App.css";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "./footer";

class Admin extends React.Component {
  render() {
    return (
      <div id="admin">
        <br />
        <h1>
          <i>Hello Admin!!!</i>
        </h1>
        <br />
        <br />

        <div className="admin-buttons">
          <div className="row">
            <div className="col-md-6">
              <Link to={{ pathname: "/AdminProduct"}}>
                <button className="btn btn-primary">Products</button>
              </Link>
            </div>
            <div className="col-md-6">
              <Link to={{ pathname: "/AdminUser" }}>
                <button className="btn btn-primary">Users</button>
              </Link>
            </div>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Footer />
      </div>
    );
  }
}

export default Admin;
