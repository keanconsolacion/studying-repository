import React from "react";

const Spinner = (props) => {
  return (
    <div className="ui active dimmer">
      <div className="ui big text loader">{props.message}</div>
    </div>
  );
};

//These properties will be used if no value is passed to a certain property.
Spinner.defaultProps = {
  message: "Loading...",
};

export default Spinner;
