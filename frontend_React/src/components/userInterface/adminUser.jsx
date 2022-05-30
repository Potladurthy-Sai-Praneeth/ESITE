import React from "react";

import "./../../Styling/App.css";
import "bootstrap/dist/css/bootstrap.css";
import AdminUserIndividual from "./adminUserIndividual";
import Footer from "./footer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { startGettingAllUsers } from "../actions/actions";
import { startDeletingUser } from "../actions/actions";
import { startShowingLoading } from "../actions/actions";
import { startHidingLoading } from "../actions/actions";
import Fallback from "./fallback";
function mapStateToProps(state) {
  return {
    store: state,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      startGettingAllUsers,
      startDeletingUser,
      startShowingLoading,
      startHidingLoading,
    },
    dispatch
  );
}
class AdminUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      extra: false,
    };
    this.getdata = this.getdata.bind(this);
    this.getdata();
    this.enumFunction = this.enumFunction.bind(this);
  }
  async enumFunction(type, url, payload = {}) {
    switch (type) {
      case "DELETE_USER": {
        await this.props.startDeletingUser(url);
        this.setState({ extra: true });
        this.props.startShowingLoading();
        setTimeout(() => {
          this.props.startHidingLoading();
        }, 1100);
        break;
      }
    }
  }
  componentDidUpdate() {
    if (this.state.extra) {
      this.setState({ extra: false });
      this.getdata();
    }
  }

  async getdata() {
    await this.props.startGettingAllUsers("http://localhost:8081/api/users");
    this.props.startShowingLoading();
    setTimeout(() => {
      this.setState({ users: this.props.store.allUsers });
      this.props.startHidingLoading();
    }, 1100);
  }

  render() {
    if (this.state.loading) return <Fallback />;
    return (
      <div>
        <h1 className="display-4 text-center text-black mb-3">
          <i>Users List</i>
        </h1>
        <br />
        <table className="table table-striped table-bordered table-md">
          <thead className="head">
            <tr>
              <td className="head-element">Name</td>
              <td className="head-element">User Id</td>
              <td className="head-element">No. of Orders</td>
              <td className="head-element">Orders</td>
              <td className="head-element">Delete</td>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((el) => {
              return (
                <AdminUserIndividual
                  data={el}
                  dispatch={this.enumFunction}
                  key={el._id}
                />
              );
            })}
          </tbody>
        </table>
        <br />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);
