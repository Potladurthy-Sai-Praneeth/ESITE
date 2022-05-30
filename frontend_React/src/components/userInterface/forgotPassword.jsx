import React from "react";
import "./../../Styling/App.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { encryptPassword } from "../utils/confirmLogin";
import { startSendingEmailToUser } from "../actions/actions";
import { startVerifyingUserDetails } from "../actions/actions";
import ErrorBoundary from "./errorBoundary";
function mapStateToProps(state) {
  return {
    store: state,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      startSendingEmailToUser,

      startVerifyingUserDetails,
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
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailid: "",
      oldPassword: "",
      formValid: false,
      formCheck: false,
      linkActive: false,
      errors: {
        emailid: "",
        oldPassword: "",
      },
    };
    this.goToUpdatePassword = this.goToUpdatePassword.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.helperFunc = this.helperFunc.bind(this);
  }
  helperFunc() {
    this.props.store.isLoggedIn ? this.goToUpdatePassword() : this.sendEmail();
  }
  async goToUpdatePassword() {
    await this.props.startVerifyingUserDetails(
      "http://localhost:8081/api/verifyUser",
      {
        email: this.props.store.individualUserObject.userid,
        pwd: this.state.oldPassword,
      }
    );
    let errors = this.state.errors;
    // console.log(this.props.store);

    setTimeout(() => {
      if (this.props.store.userVerified) {
        this.handleSubmit("password");
        this.setState({ formValid: true });
        this.setState({ formCheck: true });
      } else {
        errors.oldPassword = this.props.store.userValidationMessage;
        this.setState({ formValid: false });
        this.setState({ formCheck: false });
      }
    }, 1000);
  }

  async sendEmail() {
    await this.props.startSendingEmailToUser(
      "http://localhost:8081/api/forgotPassword",
      {
        email: this.state.emailid,
      }
    );
    let errors = this.state.errors;
    setTimeout(() => {
      if (this.props.store.userVerified) {
        this.handleSubmit("email");
        this.setState({ formValid: true });
      } else {
        errors.emailid = this.props.store.userValidationMessage;
        this.setState({ formValid: false });
        this.setState({ formCheck: false });
      }
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
          }
        }
        break;
      case "oldPassword":
        {
          if (value.length === 0)
            errors.oldPassword = "Please enter the current Password";
          else if (value.length < 8)
            errors.oldPassword = "Password must be at least 8 characters long!";
          else if (!/[!@#$%^&*]/.test(value))
            errors.oldPassword =
              "Atleast one Special character !@#$%^&* is required";
          else errors.oldPassword = "";
        }
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };
  handleSubmit = (from) => {
    if (validateForm(this.state.errors)) {
      console.info("Valid Form");
      this.setState({ formValid: true });
      if (from === "email") {
        
        return false;
      } else if (from === "password") {
        this.setState({ formValid: true });
        alert("Password Validated. Click on Proceed to continue");
        
      }
    } else {
      console.error("Invalid Form");
      this.setState({ formValid: false });
    }
  };
  render() {
    const { errors } = this.state;
    
    return (
      <div>
        <main role="main">
          <form id="js-form" onSubmit={this.handleSubmit} noValidate>
            <div className="form-group">
              <input
                type="password"
                id={this.props.store.isLoggedIn ? "oldPassword" : "emailid"}
                name={this.props.store.isLoggedIn ? "oldPassword" : "emailid"}
                className="form-field"
                placeholder={
                  this.props.store.isLoggedIn
                    ? "Please enter current Password"
                    : "Please enter Email Id"
                }
                value={
                  this.props.store.isLoggedIn
                    ? this.state.oldPassword
                    : this.state.emailid
                }
                noValidate
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              {this.props.store.isLoggedIn
                ? errors.oldPassword.length > 0 && (
                    <p className="error" data-testid="error-msg">
                      {errors.oldPassword}
                    </p>
                  )
                : errors.emailid.length > 0 && (
                    <p className="error" data-testid="error-msg">
                      {errors.emailid}
                    </p>
                  )}
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                value="Check me to Continue"
                name="checkbox"
                onChange={this.helperFunc}
                defaultChecked={this.state.formCheck}
              />
              &nbsp;Please Check me to Validate
            </div>
          </form>

          <Link
            to={
              this.props.store.isLoggedIn ? "/UpdatePassword" : "/ResetPassword"
            }
            as={Link}>
            <button
              disabled={!this.state.formValid}
              className="btn btn-primary">
              Proceed
            </button>
          </Link>
        </main>
      </div>
    );

     }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
