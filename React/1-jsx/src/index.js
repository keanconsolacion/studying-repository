// Import the react and react-dom libraries
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

// Create root
const root = createRoot(document.querySelector("#root"));

// Create a react component
const App = () => {
  const [value, setValue] = useState(0);
  
  const incrementValue = () => {
    setValue(value + 1);
  };

  console.log("Parent renders...");

  return (
    <div>
      <h3>{value}</h3>
      <button onClick={incrementValue}>Rerender parent</button>
      {ChildComponent()}
    </div>
  );
};

const ChildComponent = () => {
  const [value, setValue] = useState(0);

  const incrementValue = () => {
    setValue(value + 1);
  };

  console.log("Child renders");

  return (
    <div className="ui container">
      <h3>{value}</h3>
      <button onClick={incrementValue}>Rerender child</button>
    </div>
  );
};

root.render(<App />);
