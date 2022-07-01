import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
// import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from "./components/App.js";
import reducers from "./reducers";

const root = createRoot(document.querySelector("#root"));
const store = configureStore({ middleware: [thunk], reducer: reducers });
//const store = createStore(reducers, applyMiddleware(thunk));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
