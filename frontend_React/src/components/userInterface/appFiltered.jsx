import React from "react";
import AppFilteredIndividual from "./appFilteredIndividual";
import "../../Styling/App.css";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { startGettingRequestedProducts } from "../actions/actions";

function mapStateToProps(state) {
  return {
    store: state,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ startGettingRequestedProducts }, dispatch);
}
class AppFiltered extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: [],

      asked: this.props.asked,
    };
    this.apiget = this.apiget.bind(this);
    this.apiget();
  }
  async apiget() {
    await this.props.startGettingRequestedProducts(
      `http://localhost:8081/api/products/${this.props.asked}`
    );
    setTimeout(() => {
      this.setState({ input: this.props.store.requestedProducts });
    }, 1000);
  }
  render() {
    return (
      <div>
        <div className="container">
          <br />
          <h2>
            <i>Popular {this.state.asked}</i>
          </h2>
          <div className="row mt-5 popular">
            {this.state.input.map((el) => {
              if (el.popularity === "high")
                return <AppFilteredIndividual data={el} key={el._id} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppFiltered);
// export default AppFiltered;
