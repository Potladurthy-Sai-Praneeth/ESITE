import React from "react";
import "./../../Styling/App.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { encryptPassword } from "../utils/confirmLogin";
import { startSendingEmailToUser } from "../actions/actions";
import { startResettingPassword } from "../actions/actions";

function mapStateToProps(state) {
  return {
    store: state,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      startSendingEmailToUser,
      startResettingPassword,
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
class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resetToken: "",
      password: "",
      confirmPassword: "",
      formValid: false,
      passwordHash: "",
      errors: {
        password: "",
        confirmPassword: "",
        resetToken: "*Mandatory",
      },
    };
    this.resetPassword = this.resetPassword.bind(this);
  }
  async resetPassword() {
    await this.props.startResettingPassword(
      "http://localhost:8081/api/resetPassword",
      {
        resetToken: this.state.resetToken,
        pass: this.state.passwordHash,
      }
    );
    let errors = this.state.errors;
    setTimeout(() => {
      if (this.props.store.userVerified) {
        this.setState({ formValid: true });
        this.handleSubmit();
      } else {
        
      errors.confirmPassword = this.props.store.userValidationMessage;
      }
    }, 1000);
  }

  handleChange = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    let errors = this.state.errors;
    switch (name) {
      case "password":
        {
          if (value.length === 0) errors.password = "Please enter the Password";
          else if (value.length < 8)
            errors.password = "Password must be at least 8 characters long!";
          else if (!/[!@#$%^&*]/.test(value))
            errors.password =
              "Atleast one Special character !@#$%^&* is required";
          else {
            errors.password = "";
          }
        }
        break;
      case "confirmPassword":
        {
          if (value !== this.state.password)
            errors.confirmPassword = "Password Must match";
          else {
            errors.confirmPassword = "";
            this.setState({
              passwordHash: await encryptPassword(this.state.password),
            });
          }
        }
        break;
      case "resetToken":
        {
          if (value.length === 0) errors.resetToken = "Token is required";
          else {
            errors.resetToken = "";
          }
        }
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };
  handleSubmit = () => {
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
        <main role="main">
          <form id="js-form" onSubmit={this.handleSubmit} noValidate>
            <div className="form-group">
              <input
                type="password"
                id="resetToken"
                name="resetToken"
                className="form-field"
                placeholder="Token Recieved"
                value={this.state.resetToken}
                noValidate
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              {errors.resetToken.length > 0 && (
                <p className="error" data-testid="error-msg">{errors.resetToken}</p>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                className="form-field"
                placeholder="New Password"
                value={this.state.password}
                noValidate
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              {errors.password.length > 0 && (
                <p className="error" data-testid="error-msg">{errors.password}</p>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-field"
                placeholder="Confirm New Password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                noValidate
              />
              {errors.confirmPassword.length > 0 && (
                <p className="error" data-testid="error-msg">{errors.confirmPassword}</p>
              )}
            </div>
            <div>
              <input
                type="checkbox"
                value="Check me to Continue"
                name="checkbox"
                onChange={() => this.resetPassword()}
              />
              &nbsp;Please Check me to Validate
            </div>
            <Link to="/Home">
              <button
                disabled={!this.state.formValid}
                onClick={() => {
                  alert("Password Reset.Kindly Login again");
                  window.location.assign("/");
                }}
                className="btn btn-success">
                Reset Password
              </button>
            </Link>
          </form>
        </main>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
