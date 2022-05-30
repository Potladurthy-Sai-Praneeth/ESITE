import React from "react";
import "./../../Styling/App.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { encryptPassword } from "../utils/confirmLogin";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { startSendingEmailToUser } from "../actions/actions";
import { startResettingPassword } from "../actions/actions";
import { startVerifyingUserDetails } from "../actions/actions";
import { startUpdatingUserPassword } from "../actions/actions";
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
      startVerifyingUserDetails,
      startUpdatingUserPassword,
    },
    dispatch
  );
}
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};
class UpdatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmNewPassword: "",
      formValid: false,
      passwordHash: "",
      errors: {
        confirmNewPassword: "",
        newPassword: "",
      },
    };
    this.updatePassword = this.updatePassword.bind(this);
  }
  async updatePassword() {
    await this.props.startUpdatingUserPassword(
      "http://localhost:8081/api/updatePassword",
      {
        id: this.props.store.individualUserObject._id,
        newPassword: this.state.passwordHash,
      }
    );

    let errors = this.state.errors;

    setTimeout(() => {
      if (this.props.store.userVerified) {
        this.setState({ formValid: true });
        this.handleSubmit();
      } else {
        errors.confirmNewPassword = this.props.store.userValidationMessage;
      }
    }, 1000);
  }
  handleChange = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    let errors = this.state.errors;
    switch (name) {
      case "newPassword":
        {
          if (value.length === 0)
            errors.newPassword = "Please enter the new Password";
          else if (value.length < 8)
            errors.newPassword = "Password must be at least 8 characters long!";
          else if (!/[!@#$%^&*]/.test(value))
            errors.oldPassword =
              "Atleast one Special character !@#$%^&* is required";
          else errors.newPassword = "";
        }
        break;
      case "confirmNewPassword":
        {
          if (value !== this.state.newPassword)
            errors.confirmNewPassword = "Passwords Must match";
          else {
            errors.confirmNewPassword = "";
            this.setState({
              passwordHash: await encryptPassword(this.state.newPassword),
            });
            this.setState({ confirmNewPassword: "" });
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
                id="newPassword"
                name="newPassword"
                className="form-field"
                placeholder="Please enter new Password"
                value={this.state.newPassword}
                noValidate
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              {errors.newPassword.length > 0 && (
                <p className="error" data-testid="error-msg">{errors.newPassword}</p>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                className="form-field"
                placeholder="Confirm Password"
                value={this.state.confirmNewPassword}
                onChange={this.handleChange}
                onBlur={this.handleChange}
                noValidate
              />
              {errors.confirmNewPassword.length > 0 && (
                <p className="error" data-testid="error-msg">{errors.confirmNewPassword}</p>
              )}
            </div>
            <div>
              <input
                type="checkbox"
                value="Check me to Continue"
                name="checkbox"
                onChange={() => this.updatePassword()}
              />
              &nbsp;Please Check me to Validate
            </div>
            <Link to="/Home">
              <button
                disabled={!this.state.formValid}
                className="btn btn-success"
                onClick={() => {
                  alert("Password Reset,Login Again");
                  window.location.assign("/");
                }}>
                Reset Password
              </button>
            </Link>
          </form>
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
