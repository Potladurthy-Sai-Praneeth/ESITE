import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { Link } from "react-router-dom";
import "./../../Styling/App.css";

class AdminUserIndividual extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    
    if (this.props.data)
      return (
        <tr>
          <td>{this.props.data.name}</td>
          <td>{this.props.data.userid}</td>
          <td>{this.props.data.orders}</td>
          <td>
            {this.props.data.items.map((el, index) => {
              return <p key={index}>{el.prodname}</p>;
            })}
          </td>
          <td>
            <Link to={{ pathname: "/AdminUser" }}>
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.props.dispatch(
                    "DELETE_USER",
                    `http://localhost:8081/api/deleteUsers/${this.props.data._id}`
                  );
                }}>
                Delete
              </button>
            </Link>
          </td>
        </tr>
      );
    else new Error("Not Authorized");
  }
}
export default AdminUserIndividual;
