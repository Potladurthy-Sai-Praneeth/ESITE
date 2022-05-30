import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./../../Styling/App.css";
import Footer from "./footer";
import ProductIndividual from "./productIndividual";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { startGettingIndividualUser } from "../actions/actions";

function mapStateToProps(state) {
  return {
    store: state,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
            startGettingIndividualUser,
    },
    dispatch
  );
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
      cart: [],
      actualUser: this.props.store.individualUserObject,
      orders: [],
      extra: true,
    };
  }
  async componentDidMount() {
    this.setState({
      actualUser: this.props.store.individualUserObject,
    });
  }
  async componentDidUpdate() {
    if (this.state.extra) {
      await this.props.startGettingIndividualUser(
        `http://localhost:8081/api/users/${this.props.store.email}`
      );
     
      this.setState({ extra: false });
      setTimeout(() => {
        this.setState({ actualUser: this.props.store.individualUserObject });
      }, 1000);
    }
  }

  render() {
    return (
      <div className="profile text-centered">
        {this.props.store.user !== "Admin" ? (
          <div>
            <p>
              <b> Hi </b> {this.state.actualUser.name}
            </p>
            <p>
              <b> Your registered email: </b>
              {this.state.actualUser.userid}
            </p>
            <label>
              <b> Your Previous Orders: </b>
            </label>
            {/* <p> {this.state.orders} </p> */}
            <div className="productIndividual">
              {this.state.actualUser.items.length > 0 ? (
                this.state.actualUser.items.map((el, index) => {
                  return <ProductIndividual data={el} key={index} />;
                })
              ) : (
                <div>
                  <p>No Orders Yet</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link to={{ pathname: "/Admin" }}>
            <br />
            <button className="btn btn-success">View Items</button>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Link>
        )}
       
        <Footer />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
