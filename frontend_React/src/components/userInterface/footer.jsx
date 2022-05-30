import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./../../index.css";
import "./../../Styling/App.css";

class Footer extends React.Component {
  render() {
    return (
      <div>
        <div className="footer">
          <div className="footer-blue">
            <label className="footer-blue-text">
              Equipping your creativity, since 1974. Read <u>our story.</u>
            </label>
          </div>
          <div className="footer-dark-gray">
            <div className="row">
              <div className="col-md-3">
                <a href="#">800-223-2500</a>
              </div>
              <div className="col-md-3">
                <a href="#">Help Center</a>
              </div>
              <div className="col-md-3">
                <a href="#">NYC Store Hours</a>
              </div>
              <div className="col-md-3">
                <a href="#">Live Chat</a>
              </div>
            </div>
          </div>
          <div className="footer-light-gray">
            <div className="row">
              <div className="col-md-4 ">
                <br />
                <p>
                  <Link to={{ pathname: "/Contact" }}>
                    <strong>Connect with Us</strong>
                  </Link>
                </p>
              </div>
              <div className="col-md-4 ">
                <br />
                <p>
                  <Link to={{ pathname: "/About" }}>
                    <strong>About Us</strong>
                  </Link>
                </p>
              </div>

              <div className="col-md-4 ">
                <br />
                <p>
                  <strong>Stay in the Know</strong>
                </p>
                <div className="input-group email">
                  <input
                    type="text"
                    id="email"
                    className="form-control-sm"
                    placeholder="Email Address"
                    aria-label="text"
                    aria-describedby="basic-addon2"
                  />
                  <Link to="/MyAccount">
                    <button
                      className="input-group-append btn btn-primary btn-sm"
                      id="basic-addon2">
                      SignUp
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-blue">
            <label className="footer-blue-text">
              Copyright E$!Te, Inc. All rights reserved. •Privacy Policy •Terms
              of Use
              <br />
              42 West 18th Street New York, NY 10011 (directions) • 800.223.2500
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
