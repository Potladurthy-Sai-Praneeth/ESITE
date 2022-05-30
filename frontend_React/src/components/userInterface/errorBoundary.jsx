import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null,
    };
  }
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error,
      info: info,
    });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>
            <p>Oops, something went wrong :(</p>
          </h1>

          <p>
            <i>The error</i>: {this.state.error.toString()}
          </p>
          <p>
            <i>Where it occured</i>: {this.state.info.componentStack}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
