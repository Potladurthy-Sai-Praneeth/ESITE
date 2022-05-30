import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { connect, useSelector } from "react-redux";

function mapStateToProps(state) {
  return {
    store: state,
  };
}

class ProtectedRoute extends React.Component {
  render() {
    const Component = this.props.component;

    return this.props.store.isLoggedIn ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  }
}
export default connect(mapStateToProps)(ProtectedRoute);
