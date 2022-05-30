import React from "react";
import "./../../Styling/App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "./footer";
import { startAddingUser } from "../actions/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { encryptPassword } from "../utils/confirmLogin";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};
function mapStateToProps(state) {
  return {
    store: state,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startAddingUser }, dispatch);
}
class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      associatename: "",
      emailid: "",
      password: "",
      passwordHash: "",
      confirmpassword: "",
      formValid: false,
      errors: {
        associatename: "",
        emailid: "",
        password: "",
        confirmpassword: "",
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    let errors = this.state.errors;
    switch (name) {
      case "associatename":
        {
          if (value.length === 0)
            errors.associatename = "Please enter the Name";
          else if (value.length > 0 && (value.length < 5 || value.length > 30))
            errors.associatename =
              "Name must be at least 5 characters long and max of 30 characters";
          else if (!/^[a-zA-Z ]*$/.test(value))
            errors.associatename =
              "Accepts Alphabets, space & Min 5 to Max 30 Char";
          else errors.associatename = "";
        }
        break;
      case "emailid":
        {
          if (value.length == 0) errors.emailid = "Please enter the Email id.";
          else if (!validEmailRegex.test(value))
            errors.emailid = "Email is not valid!";
          else errors.emailid = "";
        }
        break;
      case "password":
        {
          if (value.length === 0) errors.password = "Please enter the Password";
          else if (value.length < 8)
            errors.password = "Password must be at least 8 characters long!";
          else if (!/[!@#$%^&*]/.test(value))
            errors.password =
              "Atleast one Special character !@#$%^&* is required";
          else errors.password = "";
        }
        break;
      case "confirmpassword":
        {
          if (value !== this.state.password)
            errors.confirmpassword = "Password Must match";
          else {
            errors.confirmpassword = "";
          }
        }
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      console.info("Valid Form");
      this.setState({ formValid: true });
    } else {
      console.error("Invalid Form");
    }
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="MyAccount">
          <header>Sign Up</header>
          <main role="main" className="form-wrapper">
            <form id="js-form" onSubmit={this.handleSubmit} noValidate>
              <div className="form-group">
                <input
                  type="text"
                  id="associatename"
                  name="associatename"
                  className="form-field"
                  placeholder="Name"
                  value={this.state.associatename}
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                  noValidate
                />
                {errors.associatename.length > 0  && (
                  <p className="error" data-testid="error-msg-name">{errors.associatename}</p>
                )}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="emailid"
                  name="emailid"
                  className="form-field"
                  placeholder="Email Id"
                  value={this.state.emailid}
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                  noValidate
                />
                {errors.emailid.length > 0 && (
                  <p className="error" data-testid="error-msg-email">{errors.emailid}</p>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-field"
                  placeholder="Password"
                  value={this.state.password}
                  noValidate
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                />
                {errors.password.length > 0 && (
                  <p className="error" data-testid="error-msg-pwd">{errors.password}</p>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="confirmpassword"
                  name="confirmpassword"
                  className="form-field"
                  placeholder="Confirm Password"
                  value={this.state.confirmpassword}
                  onChange={this.handleChange}
                  noValidate
                />
                {errors.confirmpassword.length > 0 && (
                  <p className="error" data-testid="error-msg-confirmpwd">{errors.confirmpassword}</p>
                )}
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Check me to Continue"
                  name="checkbox"
                  onChange={ this.handleSubmit}
                />
                &nbsp;Check me to Proceed
              </div>
              <div className="form-controls" id="buttons">
                <button
                  className="button"
                  type="submit"
                  id="submit"
                  disabled={!this.state.formValid}
                  onClick={async () => {
                    this.props.startAddingUser(
                      "http://localhost:8081/api/users",
                      {
                        name: this.state.associatename,
                        userid: this.state.emailid,
                        password: await encryptPassword(this.state.password),
                        orders: 0,
                        items: [],
                        cart: 0,
                        wishlist: 0,
                      }
                    );
                    setTimeout(() => {
                      window.location.assign("/Login");
                    }, 1000);
                  }}>
                  Sign Up
                </button>

                <p>
                  Already a user?&nbsp;&nbsp;
                  <Link
                    to={{
                      pathname: "/Login",
                    }}>
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
