import React from "react";
import { connect } from "react-redux";
import { incrementValue, decrementValue } from "../actions";

const App = ({ counter, incrementValue, decrementValue }) => {
  return (
    <div>
      <h2>Value: {counter}</h2>
      <button onClick={incrementValue}>Increment</button>
      <button onClick={decrementValue}>Decrement</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { counter: state.counter };
};

export default connect(mapStateToProps, {
  incrementValue,
  decrementValue,
})(App);
