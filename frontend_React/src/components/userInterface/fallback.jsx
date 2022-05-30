import React from "react";
import "../../Styling/style.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
function mapStateToProps(state) {
  return {
    store: state,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}
class Fallback extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.store.loading)
      return (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      );
    else return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fallback);
