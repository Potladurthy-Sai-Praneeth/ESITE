import React from "react";
import "./../../Styling/App.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "./footer";
import { changeUser } from "../actions/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { startVerifyingUserDetails } from "../actions/actions";
import { startGettingIndividualUser } from "../actions/actions";
import ErrorBoundary from "./errorBoundary";
import { Fragment } from "react/cjs/react.production.min";
import Profile from "./profile";
function mapStateToProps(state) {
  return {
    store: state,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      changeUser,
      startVerifyingUserDetails,
      startGettingIndividualUser,
    },
    dispatch
  );
}

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailid: "",
      password: "",
      formValid: false,
      userName: "",
      index: -1,
      path: "/Profile",
      userArray: [],
      errors: {
        emailid: "",
        password: "Note: Passwords are Case Sensitive",
      },
    };

    this.checkPassword = this.checkPassword.bind(this);
  }

  async checkPassword(event) {
    let errors = this.state.errors;

    await this.props.startVerifyingUserDetails(
      "http://localhost:8081/api/verifyUser",
      {
        email: this.state.emailid,
        pwd: this.state.password,
      }
    );

    setTimeout(() => {
      this.handleSubmit(event);
    }, 1000);
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "emailid":
        {
          if (value.length == 0) errors.emailid = "Please enter the Email id.";
          else if (!validEmailRegex.test(value))
            errors.emailid = "Email is not valid!";
          else {
            errors.emailid = "";
            if (value === "admin@gmail.com") this.setState({ path: "/Admin" });
          }
        }
        break;
      case "password":
        {
          if (value.length === 0) {
            this.setState({ formValid: false });
            errors.password = "Please enter the Password";
          } else if (value.length < 8) {
            errors.password = "Password must be at least 8 characters long!";
            this.setState({ formValid: false });
          } else if (!/[!@#$%^&*]/.test(value)) {
            errors.password =
              "Atleast one Special character !@#$%^&* is required";
            this.setState({ formValid: false });
          } else {
            errors.password = "";
          }
        }
        break;
    }
    this.setState({ errors, [name]: value });
  };
  handlePassword = async (event) => {
   
    this.checkPassword(event);
  };
  handleSubmit = () => {
    if (this.props.store.userVerified) {
      this.state.errors.password = "";
      alert("Authentication Successful");
      this.props.startGettingIndividualUser(
        `http://localhost:8081/api/users/${this.state.emailid}`
      );
    } else {
      this.state.errors.password = this.props.store.userValidationMessage;
      this.setState({ formValid: false });
    }

    if (validateForm(this.state.errors)) {
      console.info("Valid Form");
      this.setState({ formValid: true });
    } else {
      console.error("Invalid Form");
      this.setState({ formValid: false });
    }
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="MyAccount">
          <header>Log In</header>
          <main role="main">
            <form id="js-form" onSubmit={this.handleSubmit} noValidate>
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
                  onChange={this.handleChange}
                  noValidate
                />
                {errors.password.length > 0 && (
                  <p className="error" data-testid="error-msg-pwd">{errors.password}</p>
                )}
              </div>
              <div>
                <input
                  type="checkbox"
                  value="Check me to Continue"
                  name="checkbox"
                  onChange={this.handlePassword}
                />
                &nbsp;Please Check me to Validate
              </div>

              <div className="form-controls" id="buttons">
                <Link
                  to={{
                    pathname: this.state.path,
                   
                  }}>
                  <button
                    className="button"
                    type="submit"
                    disabled={!this.state.formValid}
                   
                  >
                    Log in
                  </button>
                </Link>

                <Link to="/ForgotPassword">
                  <p>Forgot Password</p>
                </Link>

                <p>
                  Don't have an account? <Link to="/MyAccount">Sign Up</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
