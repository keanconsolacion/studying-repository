import React from "react";
import { createRoot } from "react-dom/client";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  constructor(props) {
    super(props);
  }

  // Loads when content is shown
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (error) => this.setState({ errorMessage: error.message })
    );
  }
  // Loads whenever this component is updated
  componentDidUpdate() {}
  // Loads when content is no longer shown
  componentWillUnmount() {}

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="Please accept location request." />;
  }

  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
